import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["todo", "in Progress", "done", "archive"],
    default: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Task", taskSchema)