const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "patient name required"],
      lowercase: true,
    },
    diagonseWith: {
      type: String,
      required: [true, "this field required"],
    },
    patientaddress: {
      type: String,
      required: [true, "patient address required"],
    },
    patientAge: {
      type: Number,
      required: [true, "patient age required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group required"],
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      required: [true, "gender required"],
    },
    admittedIn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
