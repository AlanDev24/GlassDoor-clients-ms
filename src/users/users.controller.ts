import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, PaginationDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_users' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_by_email' })
  findByEmail(@Payload('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(@Payload('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  remove(@Payload('id') id: string) {
    return this.usersService.remove(id);
  }
}
