require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();
app.use(routes);

app.use(express.json());

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
