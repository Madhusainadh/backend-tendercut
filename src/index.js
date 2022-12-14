const express = require("express");
const { default: mongoose } = require("mongoose");
const Address = require("../Routes/Address.route");
const AddressModel = require("../Schemas/Address");
const cartModel = require("../Schemas/Cart.model");
const ProdModel = require("../Schemas/Prods.model");
const Cartroute = require("../Routes/Cart.route");
const Productsroute = require("../Routes/Productrouter");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 8080;
// Note: added routes and end points
app.use("/address", Address);
app.use("/cart", Cartroute);
app.use("/products", Productsroute);
app.get("/",(req,res)=>{
  res.send("Home Page")
})
app.post("/login", async (req, res) => {
  const { email, password, number } = req.body;
  if (!email || !password || !number) {
    res.status(500).send("invalid email or password");
  }
  const data = await AddressModel.findOne({ email, password, number });

  if (!data) {
    res.status(404).send("no user found");
  }
  res.send(data);
});
app.post("/getuser", async (req, res) => {
  const { userid } = req.body;
  if (userid) {
    try {
      const data = await AddressModel.findOne({ _id: userid });
      res.send(data);
    } catch (error) {
      res.status(404).send("something went wrong");
    }
  } else {
    res.status(500).send("invalid address");
  }
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(PORT, () => console.log("server satrted")))
  .catch((er) => console.log(er));
