// models/History.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["text", "image", "audio", "video"],
    required: true,
  },
  prompt: { type: String },
  output: { type: String }, // URL or text
  meta: { type: Object }, // optional: durations, sizes, etc.
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.History ||
  mongoose.model("History", historySchema);
