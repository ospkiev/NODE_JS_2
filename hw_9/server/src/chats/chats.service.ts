import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ChatDTO } from '../dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const CHATS_FILE = path.join(__dirname, '../../store/chats.json');

@Injectable()
export class ChatsService {
  private chats: ChatDTO[] = [];

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(CHATS_FILE)) {
      this.chats = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf-8'));
    } else {
      this.chats = [];
    }
  }

  private save() {
    fs.writeFileSync(CHATS_FILE, JSON.stringify(this.chats, null, 2));
  }

  findAll(): ChatDTO[] {
    return this.chats;
  }

  findById(id: string): ChatDTO {
    const chat = this.chats.find(c => c.id === id);
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  create(name: string, creatorId: string): ChatDTO {
    const chat: ChatDTO = {
      id: uuidv4(),
      name,
      members: [creatorId],
      updatedAt: new Date().toISOString(),
    };
    this.chats.push(chat);
    this.save();
    return chat;
  }

  addMember(chatId: string, userId: string) {
    const chat = this.findById(chatId);
    if (!chat.members.includes(userId)) {
      chat.members.push(userId);
      chat.updatedAt = new Date().toISOString();
      this.save();
    }
    return chat;
  }

  removeMember(chatId: string, userId: string) {
    const chat = this.findById(chatId);
    chat.members = chat.members.filter(id => id !== userId);
    chat.updatedAt = new Date().toISOString();
    this.save();
    return chat;
  }

  update(chatId: string, name: string, userId: string) {
    const chat = this.findById(chatId);
    if (chat.members[0] !== userId) throw new ForbiddenException('Only admin can update');
    chat.name = name;
    chat.updatedAt = new Date().toISOString();
    this.save();
    return chat;
  }

  remove(chatId: string, userId: string) {
    const idx = this.chats.findIndex(c => c.id === chatId);
    if (idx === -1) throw new NotFoundException('Chat not found');
    if (this.chats[idx].members[0] !== userId) throw new ForbiddenException('Only admin can delete');
    this.chats.splice(idx, 1);
    this.save();
  }
} 