import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      // add ansi colors to make scanning logs easier in terminal
      const isTty = Boolean(process.stdout?.isTTY);
      const color = (text: string, open: string) =>
        isTty ? `${open}${text}\x1b[0m` : text;

      const methodColored = color(method, '\x1b[1m'); // bold
      const pathColored = color(originalUrl, '\x1b[90m'); // gray

      let statusColored = String(statusCode);
      if (statusCode >= 500)
        statusColored = color(statusColored, '\x1b[31m'); // red
      else if (statusCode >= 400)
        statusColored = color(statusColored, '\x1b[33m'); // yellow
      else if (statusCode >= 300)
        statusColored = color(statusColored, '\x1b[36m'); // cyan
      else statusColored = color(statusColored, '\x1b[32m'); // green

      const durationColored = color(`${duration}ms`, '\x1b[2m'); // dim

      this.logger.log(
        `${methodColored} ${pathColored} ${statusColored} - ${durationColored}`,
      );
    });

    next();
  }
}
