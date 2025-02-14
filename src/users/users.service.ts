import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma';
import { PaginationDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, phoneNumber, password, roles } = createUserDto;
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password,
        roles,
      },
    });
    return user;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalItems = await this.prismaService.user.count({
      where: { isActive: true },
    });
    const lastPage = Math.ceil(totalItems / limit);
    return {
      data: await this.prismaService.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          isActive: true,
        },
      }),
      metadata: {
        totalItems,
        page,
        lastPage,
      },
    };
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }
    return false;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user with ${updateUserDto}`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
