import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

const Upload = MulterModule.registerAsync({
  useFactory() {
    return {
      storage: diskStorage({
        //文件储存位置
        destination: 'uploads',
        //文件名定制
        filename: (req, file, callback) => {
          const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
          callback(null, path)
        },
      }),
    }
  },
})
@Module({
  imports: [Upload],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
