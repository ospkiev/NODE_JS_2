import {Injectable, NotFoundException, OnModuleDestroy} from '@nestjs/common';
import { User }              from './entities/user.entity';
import { CreateUserDto }     from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private seq = 1;


  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const u = this.users.find(u => u.id === id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  create(dto: CreateUserDto) {
    const user = { id: this.seq++, ...dto };
    this.users.push(user);
    return user;
  }

  remove(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}