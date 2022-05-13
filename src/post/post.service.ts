import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { IdPostDto, PostDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async get(): Promise<{}> {
    const post = await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return post;
  }

  async all(userId: number): Promise<{}> {
    const post = await this.prisma.user.findMany({
      where: { id: userId },
      select: {
        email: true,
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return post;
  }

  async create(userId: number, dto: PostDto): Promise<{}> {
    const newPost = await this.prisma.post.create({
      data: {
        title: dto.title,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return newPost;
  }

  async update(userId: number, postId: IdPostDto, dto: PostDto): Promise<{}> {
    const check = await this.prisma.post.findFirst({
      where: {
        id: postId.id,
        authorId: userId,
      },
    });
    if (!check) throw new NotFoundException('Data Not Found');
    const updatedData = await this.prisma.post.update({
      where: {
        id: postId.id,
      },
      data: {
        title: dto.title,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return updatedData;
  }

  async delete(userId: number, postId: IdPostDto): Promise<boolean> {
    const check = await this.prisma.post.findFirst({
      where: {
        id: postId.id,
        authorId: userId,
      },
    });
    if (!check) throw new NotFoundException('Data Not Found');
    const deleteData = await this.prisma.post.delete({
      where: {
        id: postId.id,
      },
    });
    return true;
  }
}
