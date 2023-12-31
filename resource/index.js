require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const localControl = require("./controllers/localControl");
const googleStrat = require("./strategies/google");
const githubStrat = require("./strategies/github");
const port = process.env.PORT || 3001;
localControl.setLocalMode(!(port === process.env.PORT));
const app = express();
const loginRoutes = require("./routes/loginRoute");
const gameRoutes = require("./routes/gameRoute");
const dataRoutes = require("./routes/dataRoute");
const profileRoutes = require("./routes/profileRoute");
const historyRoutes = require("./routes/historyRoute");

const bootstrap = async () => {
  await googleStrat.configurePassport();
  await githubStrat.configurePassport();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static("styles"));
  app.use(express.static("scripts"));
  app.use(express.static("static"));
  app.get("/", (req, res) => {
    res.redirect("/login");
  });
  app.use("/login", loginRoutes);
  app.use("/Game", gameRoutes);
  app.use("/profile",profileRoutes)
  app.use("/data", dataRoutes);
  app.use("/history",historyRoutes);

  app.listen(port, () => {
    console.log(`Resource Server listening on http://localhost:${port}`);
  });
};

bootstrap();
