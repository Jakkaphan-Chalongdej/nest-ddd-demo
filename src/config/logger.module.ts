import { Module } from '@nestjs/common';
import { LoggerModule as CoreLoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    CoreLoggerModule.forRoot({
      pinoHttp: {
        redact: ['request.headers.authorization'],
        autoLogging: true,
        genReqId: () => uuidv4(),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            levelFirst: false,
            translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
            messageFormat: '{req.id} [{context}] {msg}',
            ignore: 'pid,hostname,context,req,res,responseTime',
            errorLikeObjectKeys: ['err', 'error'],
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
