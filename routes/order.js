const router = require("express").Router();
const Order = require("../models/Order");
const { verifyAdmin } = require("../utils/Verify");
// ADD DATA TO THE Order
router.post("/add", async (req, res, next) => {
  try {
    const data = await new Order(req.body);
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET DATA TO THE Order
router.get("/get", verifyAdmin, async (req, res, next) => {
  try {
    const data = await Order.find({});
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET DATA TO THE Order
router.get("/get/:id", async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// UPDATE PRODUCT STATUS FEILD FROM DATABASE
// router.put('/update/:id', verifyAdmin, async (req, res, next) => {
//     try {

//         const data = await Order.updateOne(
//             {
//                 _id: req.params.id,
//                 // 'PD.status': req.params.id
//             },
//             {
//                 $set: { 'PD.$[Object].status': 'ongoing' }
//             },
//             {
//                 "arrayFilters": [
//                   { "Object._id": req.params.id },
//                 ]
//               }
//             // { new: true }
//         )
//         res.status(200).json(data)
//     } catch (err) {
//         next(err);
//         console.log(err);
//     }
// })

// UPDATE SERVICE STATUS FEILD FROM DATABASE
router.put("/update/:id", verifyAdmin, async (req, res, next) => {
  try {
    const data = await Order.updateOne(
      {
        _id: req.params.id,
        // 'PD.status': req.params.id
      },
      {
        $set: { status: req.body.status },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
//  GET ORDER BY EMAIL
router.get("/orderedByEmail", async (req, res, next) => {
  const reqEmail = req.query.email;
  try {
    const data = await Order.find({ email: reqEmail });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
// DELETE DATA TO THE Order
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const data = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// DELETE PRODUCT TO THE Order
// router.delete('/delete/:id', async (req, res, next) => {
//     try {
//         const data = await Order.findByIdAndDelete(req.params.id);
//         res.status(200).json(data)
//     } catch (err) {
//         next(err);
//         console.log(err);
//     }
// })

module.exports = router;
