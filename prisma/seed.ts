import { faker } from '@faker-js/faker'
import { PrismaClient, User } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient();

async function main() {
    const users: Omit<User, 'id'>[] = [];
    for(let i = 0; i < 1000; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email()
        })
    }

    await prisma.user.createMany({
        data: users,
    })
}

main()
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    })