import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    position: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied"
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Internship", "Contract", "Remote"],
      default: "Full-time"
    },

    appliedDate: {
      type: Date,
      default: Date.now
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;