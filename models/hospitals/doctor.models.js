const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: [true, "doctor name required "],
    },
    salary: {
      type: String,
      required: [true, "salary required"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "salary can not be negative",
      },
    },
    qualification: {
      type: String,
      required: [true, "qualification required"],
    },
    experienceInYears: {
      type: Number,
      default: 0,
    },
    workInHospitals: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
