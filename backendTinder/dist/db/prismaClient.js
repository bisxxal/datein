// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function main() {
// }
// main()
//   .catch(async (e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
import { PrismaClient } from '@prisma/client';
const prismaClientSingleton = () => {
    return new PrismaClient();
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prisma;
