import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OssService } from './oss.service';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/oss/signature')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Get()
  signature() {
    return this.ossService.signature();
  }
}
