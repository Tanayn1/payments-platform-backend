import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

interface user {
    sub: string,
    username: string
}

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUser(user : user) {
        const userDetails = this.prisma.user.findUnique({where: {id: user.sub}});
        return userDetails
    }
}
