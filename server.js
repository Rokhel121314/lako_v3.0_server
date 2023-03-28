const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const path = require("path");

// imports for user
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");

// imports for stock
const Stock = require("./models/stockModel");
const stockRoutes = require("./routes/stockRoutes");

// imports for transaction
const Transaction = require("./models/transactionModel");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// MIDDLE WARES
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(stockRoutes);
app.use(userRoutes);
app.use(transactionRoutes);

app.use(express.static("build"));
app.use(
  history({
    verbose: true,
  })
);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running in PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("test12345");
});
