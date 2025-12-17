require("dotenv").config();
const app = require("./app");

const PORT = 5500;
const APP_NAME = process.env.APP_NAME;

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
