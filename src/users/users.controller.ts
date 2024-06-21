import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      console.log(req.user)
      return this.usersService.getUser(req.user); // User data from JWT payload
    }
}
