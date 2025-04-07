import cron from "node-cron";
import User from "../models/User.js";

const removeUnverifiedAccounts = () => {
  cron.schedule("*/5 * * * *", async () => {
    const thirtyMinsAgo = new Date(Date.now() - 1000 * 60 * 30);

    await User.deleteMany({
      verified: false,
      createdAt: { $lt: thirtyMinsAgo },
    });
  });
};

export default removeUnverifiedAccounts;
