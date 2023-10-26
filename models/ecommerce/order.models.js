const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: [true, "quantity required"],
  },
});

const orderSchema = mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "order price can not be negative",
      },
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemSchema],
    },
    address: {
      type: String,
      required: [true, "address required "],
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "CANCELLED", "DELIVERED"],
        message: "status must be PENDING , CANCELLED OR DELIVERD",
      },
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
