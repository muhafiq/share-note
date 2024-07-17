import cron from "node-cron";
import prismaClient from "../app/database.js";

cron.schedule("*/2 * * * *", async () => {
  try {
    await prismaClient.note.deleteMany({
      where: { deletedAt: { lt: new Date() } },
    });
    console.log("Data expired deleted!");
  } catch (error) {
    console.error("Failed delete expired data!", error);
  }
});
