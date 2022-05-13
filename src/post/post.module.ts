import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from 'src/auth/strategies';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PostController],
  providers: [PostService, AtStrategy],
})
export class PostModule {}
