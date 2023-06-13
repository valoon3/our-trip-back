import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard 는 자동으로 PassportStrategy 를 호출한다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
