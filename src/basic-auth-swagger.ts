import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BasicAuthSwagger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api/docs')) {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res
          .status(401)
          .header('WWW-Authenticate', 'Basic realm="Example"')
          .send('Authentication required');
      }

      const [username, password] = Buffer.from(
        authorization.split(' ')[1],
        'base64',
      )
        .toString()
        .split(':');

      if (
        username === process.env['SWAGGER_USER'] &&
        password === process.env['SWAGGER_PASS']
      ) {
        return next();
      } else {
        return res.status(401).send('Access denied');
      }
    } else {
      return next();
    }
  }
}
