const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  img: {
    type: String,
    default:
      "https://media.istockphoto.com/photos/festive-number-zero-of-blue-and-golden-tinsel-paper-cut-null-shape-picture-id1291643393?b=1&k=20&m=1291643393&s=170667a&w=0&h=Ol46H-zRU1zSKQ-eTlWc0ZKDsVVmZQPgdWRNuniFRws=",
  },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
