import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/bookings.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './config/database.module';
import { LoggerModule } from './config/logger.module';
import { RoomModule } from './rooms/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
    BookingModule,
    UserModule,
    RoomModule,
  ],
})
export class AppModule {}
