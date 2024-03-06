const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const serviceRoute = require("./routes/services");
const productRoute = require("./routes/products");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
// console.log(MONGO_URL)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connection established"))
  .catch((err) => console.log("error connecting", err));

app.use(cors());
app.use(express.json());
app.use("/service", serviceRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`listening port on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";
  return res.status(errStatus).json(errMessage);
});
