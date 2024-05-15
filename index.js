const express = require("express");
const mysqlPool = require("./config/db");
const jobsRoute = require("./routes/careerRoutes");
const applicationRoute = require("./routes/applicationRoute");
const cors = require("cors");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/jobsPosting", jobsRoute);
app.use("/applications", applicationRoute);

mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("mysql connected");

    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
