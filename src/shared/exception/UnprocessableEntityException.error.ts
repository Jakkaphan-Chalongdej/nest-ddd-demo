import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
  Logger,
  ValidationError,
} from '@nestjs/common';

export class UnprocessableEntityException extends HttpException {
  private readonly logger = new Logger(UnprocessableEntityException.name);
  constructor(
    objectOrError?: ValidationError[],
    descriptionOrOptions:
      | string
      | HttpExceptionOptions = 'Unprocessable Entity',
  ) {
    const { description, httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
    super(
      HttpException.createBody(
        undefined,
        description,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      HttpStatus.UNPROCESSABLE_ENTITY,
      httpExceptionOptions,
    );
    for (const error of objectOrError) {
      this.logger.log(error, 'Unprocessable Entity');
    }
  }
}
