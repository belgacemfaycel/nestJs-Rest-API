import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthentificationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    public async register(user: User) {
        try {
            return await this.usersService.create(user);
        } catch (error) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }
    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
