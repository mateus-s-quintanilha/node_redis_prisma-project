import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import redis from "../lib/cache";

const prisma: PrismaClient = new PrismaClient();

class UserController {
     static async find(req: Request, res: Response) {
        try {
            console.time('find-users')

            const cacheKey: string = "users:all";
            const cachedUsers: string | null = await redis.get(cacheKey);
            
            if(cachedUsers) { 
                console.timeEnd('find-users')
                return res.json(JSON.parse(cachedUsers));
            }

            const users: User[] = await prisma.user.findMany();
            await redis.set(cacheKey, JSON.stringify(users))
            
            console.timeEnd('find-users')
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.json({
                error: err
            });
        }
    };
};

export default UserController;