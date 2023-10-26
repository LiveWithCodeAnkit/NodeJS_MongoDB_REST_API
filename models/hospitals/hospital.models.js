const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "hospital name required"],
    },
    addressLineOne: {
      type: String,
      required: [true, "address required"],
      min: [8, "address Must Be 10 characters long"],
      max: [16, "address Maxiumm limit 30 characters "],
    },
    addressLineTwo: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "city required"],
    },
    pincode: {
      type: String,
      required: [true, "pincode required"],
    },
    specializedIn: {
      type: String,
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
