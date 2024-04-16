import { GenericService } from '#core/generic.service';
import { Controller } from '#core/swagger/Controller.decorator';
import { Get, Query } from '@nestjs/common';

@Controller('/auth')
export class AuthController extends GenericService {
  constructor() {
    super();
  }

  @Get('/success')
  ssoSuccess(@Query() queries: object): object {
    return queries;
  }
}
