import { PickType } from '@nestjs/swagger';
import { UserDto } from '../models/user.dto';

export class CreateOneUserBody extends PickType(UserDto, ['name', 'email']) {}
