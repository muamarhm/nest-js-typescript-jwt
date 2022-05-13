import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { IdPostDto, PostDto } from './dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  get(): Promise<{}> {
    return this.postService.get();
  }

  @Get('all')
  @HttpCode(HttpStatus.CREATED)
  all(@GetCurrentUserId() userId: number): Promise<{}> {
    return this.postService.all(userId);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@GetCurrentUserId() userId: number, @Body() dto: PostDto) {
    return this.postService.create(userId, dto);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  update(
    @GetCurrentUserId() userId: number,
    @Body() postId: IdPostDto,
    @Body() dto: PostDto,
  ): Promise<{}> {
    return this.postService.update(userId, postId, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  delete(
    @GetCurrentUserId() userId: number,
    @Body() postId: IdPostDto,
  ): Promise<boolean> {
    return this.postService.delete(userId, postId);
  }
}
