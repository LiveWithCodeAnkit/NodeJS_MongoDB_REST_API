const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name Required !"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "User Email Required !"],
      lowercase: true,
      unique: [true, "Email Must Be Unique"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      lowercase: true,
      min: [8, "Password Must Be 8 characters long"],
      max: [16, "Password Maxiumm limit 16 characters "],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      console.log("i am call hash:-", hash);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(
  plainPassword,
  next
) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    next(err, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
