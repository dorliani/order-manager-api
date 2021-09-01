const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) throw new Error("Email is invalid");
      },
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  const changeProperties = ["name", "city", "street"];
  const order = this;
  changeProperties.forEach((prop) => {
    order[prop] = order[prop].toLowerCase();
    order[prop] = order[prop].charAt(0).toUpperCase() + order[prop].slice(1);
  });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
