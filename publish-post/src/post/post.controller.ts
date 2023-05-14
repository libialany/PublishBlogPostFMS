import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { Status } from 'src/common/constants';
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() postData: { title: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, authorEmail } = postData;
    return this.postService.createPost({
      title,
      author: {
        connect: { email: authorEmail },
      },
      state: Status.SEND,
    });
  }

  @Get()
  listAdmin() {
    return this.postService.listAdmin();
  }

  @Get(':id/author')
  listById(@Param('id') id: string) {
    return this.postService.listById({ where: { id: Number(id) } });
  }

  @Patch(':id/reject')
  updateArticleReject(@Param('id') id: string, @Body('userId') userId: string) {
    // get the user session with request
    return this.postService.rejectPost(id, userId);
  }
  @Patch(':id/publish')
  updateArticlePublish(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    // get the userId of the session with request
    return this.postService.approvePost(id, userId);
  }
}
