import mongoose from "mongoose";

const Picture = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Picture || mongoose.model("Picture", Picture);
