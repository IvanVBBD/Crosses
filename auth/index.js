require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const localControl = require("./controllers/localControl");
const port = process.env.PORT || 3000;
localControl.setLocalMode(!(port === process.env.PORT));
const app = express();
const loginRoutes = require("./routes/loginRoute");

const bootstrap = async () => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static("scripts"));
  app.get("/", (req, res) => {
    res.redirect("/login");
  });
  app.use("/login", loginRoutes);

  app.listen(port, () => {
    console.log(`Auth Server listening on http://localhost:${port}`);
  });
};

bootstrap();
