import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth }  from '@nestjs/swagger';
import { UsersService }            from './users.service';
import { CreateUserDto }           from './dto/create-user.dto';
import {Roles, RolesGuard} from '../shared/guards/roles.guard';
import {JwtAuthGuard} from "../shared/guards/jwt-auth.guard";

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(+id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles('admin')                       // ➜ демонстрація кастомного Guard
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.users.remove(+id);
    return { deleted: true };
  }
}