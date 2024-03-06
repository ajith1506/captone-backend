const router = require("express").Router();
const Products = require("../models/Products");

// ADD DATA TO THE Products
router.post("/add", async (req, res, next) => {
  try {
    const data = await new Products(req.body);
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET ALL DATA TO THE Products
router.get("/get", async (req, res, next) => {
  try {
    const data = await Products.find({});
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET PRODUCTS BY ID
router.get("/get/:id", async (req, res, next) => {
  try {
    const data = await new Products.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// UPDATE DATA
router.put("/update/:id", async (req, res, next) => {
  try {
    const data = await new Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

// DELETE DATA TO THE Products
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const data = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;
