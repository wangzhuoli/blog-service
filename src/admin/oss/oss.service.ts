import { Injectable } from '@nestjs/common';
import { STS } from 'ali-oss';

@Injectable()
export class OssService {
  async signature() {
    const sts = new STS({
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    });
    const { credentials } = await sts.assumeRole(process.env.OSS_ARM);
    return { ...credentials };
  }
}
