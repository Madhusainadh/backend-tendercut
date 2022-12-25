const { Router } = require("express");
const AddressModel = require("../Schemas/Address");
const Address = Router();
const bcrypt = require("bcryptjs");
Address.post("/find", async (req, res) => {
  const { number } = req.body;

  try {
    const data = await AddressModel.find({ number: number });

    if (data.length === 0) res.send({ isFound: false });
    else res.send({ isFound: true, data: data });
  } catch (error) {
    res.status(401).send(error.message);
  }
});
Address.post("/create", async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    flatNumber,
    landmark,
    pincode,
    number,
  } = req.body;
  let existingnumber = await AddressModel.findOne({ number: number });
  let existingEmail = await AddressModel.findOne({ email: email });

  if (existingnumber || existingEmail) {
    console.log("existingnumber:", existingnumber);
    console.log("existingEmail:", existingEmail);
    res.status(401).send({ message: "User Already exists please Login" });
  } else {
    try {
      // const salt = await bcrypt.genSalt(10);
      // const securedPass = await bcrypt.hash(password, salt);
      const add = await AddressModel.create({
        name: name,
        email: email,
        password: password,
        address: address,
        flatNumber: flatNumber,
        landmark: landmark,
        pincode: pincode,
        number: number,
      });
      res.send(add);
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
});
Address.post("/create/multiple", async (req, res) => {
  try {
    const add = await AddressModel.create(req.body);
    res.send(add);
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = Address;
