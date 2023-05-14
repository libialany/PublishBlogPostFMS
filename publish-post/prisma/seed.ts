import { PrismaClient } from '@prisma/client';
enum Status {
  CREATE = 'CREATE',
  SEND = 'REVIEW',
  APPROVED = 'PUBLISH',
  REJECTED = 'REJECT',
}
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      isAdmin: true,
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      isAdmin: false,
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            state: Status.SEND as const,
          },
          {
            title: 'Follow Nexus on Twitter',
            state: Status.SEND as const,
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
