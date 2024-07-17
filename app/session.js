import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prismaClient from "./database.js";

const authSession = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new PrismaSessionStore(prismaClient, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 12 * 60 * 60 * 1000,
  },
});

export default authSession;
