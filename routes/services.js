const router = require("express").Router();
const Services = require("../models/Services");
const { verifyAdmin } = require("../utils/Verify");

// ADD DATA TO THE SERVICES
router.post("/add", verifyAdmin, async (req, res, next) => {
  try {
    const data = await new Services(req.body);
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET DATA TO THE SERVICES
router.get("/get", async (req, res, next) => {
  try {
    const data = await Services.find({});
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET DATA TO THE SERVICES
router.get("/get/:id", async (req, res, next) => {
  try {
    const data = await Services.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// UPDATE DATA TO THE SERVICES
router.put("/update/:id", verifyAdmin, async (req, res, next) => {
  try {
    const data = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(data);
    console.log(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// DELETE DATA TO THE SERVICES
router.delete("/delete/:id", verifyAdmin, async (req, res, next) => {
  try {
    const data = await Services.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;
