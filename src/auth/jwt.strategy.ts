import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// 다른 곳에서도 사용할 수 있도록 Injectable
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer Token 타입에서 토큰 추출
    });
  }

  // 위에서 토큰 유효한지 체크 완료 시, validate 메서드에서 payload에 있는 유저이름이 데이터베이스에서 존재하는지 확인
  // 존재한다면 유저 정보를 반환
  // 존재하지 않는다면 UnauthorizedException 에러 발생
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
