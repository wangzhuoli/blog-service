import { Injectable } from '@nestjs/common';
import { STS } from 'ali-oss';

@Injectable()
export class OssService {
  async signature() {
    const sts = new STS({
      accessKeyId: 'LTAI5t9mrfqBnUgQsCd6ZHuT',
      accessKeySecret: 'FrEKDG4Nc1ayX72ANBjfd40cJDN49Y',
    });
    const { credentials } = await sts.assumeRole(
      'acs:ram::1526380699587250:role/admin',
    );
    return { ...credentials };
  }
}
