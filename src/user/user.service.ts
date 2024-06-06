import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IResponse, IUser, createCustomException } from '../common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (emailFound)
        throw createCustomException(
          'The email is already registered',
          409,
          'User',
        );

      createUserDto.password = await this.hashPassword(createUserDto.password);
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userRepository.find({});

    if (!users) createCustomException('Data not found', 404, 'User');

    return users;
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) createCustomException('User not found', 404, 'User');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    await this.findOne(id);

    await this.userRepository.update(id, updateUserDto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<IResponse> {
    await this.findOne(id);
    await this.userRepository.delete(id);

    return {
      message: 'The user was successfully deleted',
      code: 'OK_USER_DELETE',
    };
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = parseInt(process.env.HASH_SALT as string);
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  }
}
