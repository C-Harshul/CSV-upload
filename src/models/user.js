/*===========
  User Schema
=============*/

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*----------------------Schema definition----------------------*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique:true, 
      required: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/*----------------------Abstracting password and tokens from the user----------------------*/

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/*----------------------Generate Authentication tokens for every session----------------------*/

userSchema.methods.generateAuthtoken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

/*----------------------Validating the user based on provided credentials----------------------*/

userSchema.statics.findCredentials = async (name, password) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error("Invalid emailID");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }
  return user;
};

/*----------------------Hashing the password in case of any update----------------------*/

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
