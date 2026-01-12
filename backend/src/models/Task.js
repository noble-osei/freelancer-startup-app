import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["todo", "in Progress", "done"],
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }
});

export default mongoose.model("Task", taskSchema)