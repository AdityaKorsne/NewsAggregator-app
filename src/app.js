const express = require("express");
const registerLogin = require("./controller/registerLogin");
const news = require("./controller/news");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

app.use(router);
app.use(express.json());
app.use(bodyParser.json());

router.use("/newsaggregator/v1/auth", registerLogin);
router.use("/newsaggregator/v1", news);

app.listen(3000, (err) => {
  if (err) {
    console.log(`some err occour...`);
  } else {
    console.log(`server started on port 3000`);
  }
});
