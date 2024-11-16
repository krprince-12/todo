const mongoose=require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    isChecked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Todo = new mongoose.model("Todo", todoSchema);

module.exports= {Todo};