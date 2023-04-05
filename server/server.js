const express = require("express");
const app = express();
const path = require("path");
const rootRouter = require("./routes/root");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3500;
// app.use(express.static("public")); will also work. (relative path)
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRouter);
app.all("*", (req, res) => {
  req.status = 400;
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ success: false, data: "Sorry, not found" });
  } else {
    res.send("Sorry, not found");
  }
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
