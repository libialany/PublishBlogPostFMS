import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, UserService],
})
export class PostModule {}
