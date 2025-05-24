import cron from "node-cron";

const sendGetReq = () => {
  cron.schedule("*/5 * * * *", () => {
    fetch("https://bookworm-server-h7jn.onrender.com/")
      .then()
      .catch((err) => console.log("Error:", err.message));
  });
};

export default sendGetReq;
