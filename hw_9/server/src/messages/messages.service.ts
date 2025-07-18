import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageDTO } from '../dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const MESSAGES_FILE = path.join(__dirname, '../../store/messages.json');

@Injectable()
export class MessagesService {
  private messages: MessageDTO[] = [];

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(MESSAGES_FILE)) {
      this.messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    } else {
      this.messages = [];
    }
  }

  private save() {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(this.messages, null, 2));
  }

  findByChat(chatId: string, limit: number, cursor?: string) {
    let msgs = this.messages.filter(m => m.chatId === chatId);
    msgs = msgs.sort((a, b) => b.sentAt.localeCompare(a.sentAt));
    if (cursor) {
      msgs = msgs.filter(m => m.sentAt < cursor);
    }
    const result = msgs.slice(0, limit);
    const nextCursor = msgs.length > limit ? result[result.length - 1].sentAt : null;
    return { messages: result, nextCursor };
  }

  create(chatId: string, author: string, text: string): MessageDTO {
    const msg: MessageDTO = {
      id: uuidv4(),
      chatId,
      author,
      text,
      sentAt: new Date().toISOString(),
    };
    this.messages.push(msg);
    this.save();
    return msg;
  }

  remove(id: string) {
    const idx = this.messages.findIndex(m => m.id === id);
    if (idx === -1) throw new NotFoundException('Message not found');
    this.messages.splice(idx, 1);
    this.save();
  }
} 