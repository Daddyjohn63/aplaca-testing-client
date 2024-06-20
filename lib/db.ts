import { PrismaClient } from '@prisma/client'

//Coded this way for development mode hot reload. Since we have the if clause, it will prevent prisma from yelling at us there are to many prisma clients open. 
declare global {
    var prisma: PrismaClient | undefined
}
export const db = globalThis.prisma || new PrismaClient();

//The reason why we store it in globalThis is because global is not effecte by hot reload. 
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
