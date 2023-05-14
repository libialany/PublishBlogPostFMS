import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { Status } from 'src/common/constants';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async listAdmin(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }
  async listById(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async postById(params: { where?: Prisma.PostWhereInput }): Promise<Post> {
    const { where } = params;
    return this.prisma.post.findFirst({
      where,
    });
  }
  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    const author = await this.userService.userById({
      where: { email: data.author.connect.email },
    });
    if (author.isAdmin) throw new UnauthorizedException('No user authorized');
    return this.prisma.post.create({
      data: {
        title: data.title,
        authorId: author.id,
        state: data.state,
      },
    });
  }

  async rejectPost(idPost: string, loggedId: string): Promise<Post> {
    const currentPost = await this.postById({ where: { id: Number(idPost) } });
    const statusValid = [Status.SEND];
    if (!(currentPost && statusValid.includes(currentPost.state as Status))) {
      throw new NotFoundException('Not valid transition state');
    }
    const author = await this.userService.userById({
      where: { id: Number(loggedId) },
    });
    if (!author.isAdmin) throw new UnauthorizedException('No user authorized');
    return this.prisma.post.update({
      where: { id: Number(idPost) },
      data: { state: Status.REJECTED },
    });
  }
  async approvePost(idPost: string, loggedId: string): Promise<Post> {
    const currentPost = await this.postById({ where: { id: Number(idPost) } });
    const statusValid = [Status.SEND];
    if (!(currentPost && statusValid.includes(currentPost.state as Status))) {
      throw new NotFoundException('Not valid transition state');
    }
    const author = await this.userService.userById({
      where: { id: Number(loggedId) },
    });
    if (!author.isAdmin) throw new UnauthorizedException('No user authorized');
    return this.prisma.post.update({
      where: { id: Number(idPost) },
      data: { state: Status.APPROVED },
    });
  }
}
