import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserDTO } from '../dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const USERS_FILE = path.join(__dirname, '../../store/users.json');
const ICONS_DIR = path.join(__dirname, '../../public/icons');
const DEFAULT_ICON = '/api/public/icons/default.png';

@Injectable()
export class UsersService {
  private users: UserDTO[] = [];

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(USERS_FILE)) {
      this.users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } else {
      this.users = [];
    }
  }

  private save() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2));
  }

  findAll(): UserDTO[] {
    return this.users;
  }

  findById(id: string): UserDTO {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findByName(name: string): UserDTO | undefined {
    return this.users.find(u => u.name === name);
  }

  create(name: string, iconUrl?: string): UserDTO {
    if (this.users.find(u => u.name === name)) {
      throw new ForbiddenException('User already exists');
    }
    const user: UserDTO = {
      id: uuidv4(),
      name,
      iconUrl: iconUrl || DEFAULT_ICON,
    };
    this.users.push(user);
    this.save();
    return user;
  }

  updateIcon(id: string, iconUrl: string) {
    const user = this.findById(id);
    user.iconUrl = iconUrl;
    this.save();
    return user;
  }

  remove(id: string) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users.splice(idx, 1);
    this.save();
  }
} 