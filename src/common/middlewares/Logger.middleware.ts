import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // HTTP(context)의 역할 -> HTTP 관련된 요청에서만 logger가 실행 됨, express의 debug 라이브러리와 같은 역할
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || ''; // header에서 가져옴

    // 응답이 끝났을 때
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      this.logger.log(
        `\n${userAgent}\n${method} ${originalUrl} ${statusCode}, ${contentLength}  ip: ${ip}`,
      );
    });

    next();
  }
}
