import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // text / image / audio / video / assistant
  type: {
    type: String,
    enum: ["text", "image", "audio", "video", "assistant"],
    required: true,
  },

  prompt: { type: String },
  output: { type: String },
  meta: { type: Object, default: {} },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.History ||
  mongoose.model("History", historySchema);
