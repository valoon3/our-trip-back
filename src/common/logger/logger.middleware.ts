import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('http');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `${req.ip} ${req.method} ${req.originalUrl}`,
      req.originalUrl,
    );

    // 요청이 완료되었을때 이벤트 등록
    res.on('finish', () => {
      this.logger.log(`${res.statusCode}`);
    });

    next();
  }
}
