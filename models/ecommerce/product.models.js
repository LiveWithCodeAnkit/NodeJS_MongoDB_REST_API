const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "product name required"],
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Price cannot be negative",
      },

      default: 0,
    },
    productImage: {
      type: String,
    },
    stock: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Stock can not be negative",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// mongoose.models.Product ||

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
