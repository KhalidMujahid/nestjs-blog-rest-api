import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_URI } from "./configs";
import { PostModule } from "./posts/post.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [PostModule, AuthModule, MongooseModule.forRoot(MONGO_URI)],
})
export class AppModule {}
