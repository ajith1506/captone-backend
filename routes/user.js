const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/Verify");

// REGISTER A USER
router.post("/register", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(req.body.password, salt);
  try {
    const data = await new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: hashPass,
      img: req.body.img,
    });
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

// LOGIN USER
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("username not found");

    const validatePassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("password not matched");

    const { password, isAdmin, ...others } = user._doc;

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ ...others, token });
    console.log(user._doc);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// UPDATE USER
router.put("/update/:id", async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      next(err);
      console.log(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});
// GET ALL USER
router.get("/get", async (req, res, next) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
// GET USER BY ID
router.get("/get/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
});
//DELETE USER
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.get("/verifyToken", verifyToken, (req, res) => {
  res.send("token is valid");
});
module.exports = router;
