/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { docUpload, ImgUpload } from 'src/decorator/file.decorator'
import { TransformInterceptor } from 'src/interceptor/transFormInterceptor'

@Controller('upload')
@UseInterceptors(new TransformInterceptor())
export class UploadController {
  @Post('image')
  // 自己封装的图片上传装饰器
  @ImgUpload()
  uploadImg(@UploadedFile() file:Express.Multer.File) {
    return file
  }

  @Post('doc')
  @docUpload()
  uploadDoc(@UploadedFile() file:Express.Multer.File){
    return file
  }
}
