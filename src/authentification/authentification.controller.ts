import { Body, Req, Controller, HttpCode, Post, UseGuards, Response, Get } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { User } from '../user/user.entity';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import RequestWithUser from './request-with-user.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { Response as Res } from 'express';

@Controller('authentication')
export class AuthentificationController {
    constructor(
        private readonly authenticationService: AuthentificationService
    ) { }

    @Post('register')
    async register(@Body() registrationData: User) {
        return this.authenticationService.register(registrationData);
    }

    // @HttpCode(200)
    // @UseGuards(LocalAuthenticationGuard)
    // @Post('log-in')
    // async logIn(@Req() request: RequestWithUser) {
    //     const user = request.user;
    //     user.password = undefined;
    //     return user;
    // }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestWithUser, @Response() res: Res) {
        const { user } = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        res.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return res.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() request: RequestWithUser, @Response() res: Res) {
        res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return res.sendStatus(200);

    }

}