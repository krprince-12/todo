const Todo=require("../models/app.models")
const mongoose=require("mongoose")
const todos = async (req, res, next) => {
  try {
    const response = await req.body;
    await Todo.create(response);
    return res.status(200).json({ message: "task added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error occurred while creating" });
  }
};

const getTodos = async (req, res, next) => {
  try {
    const todosData = await Todo.find();
    console.log(todosData)
    if (!todosData || !todosData.length) {
      return res.status(404).json({ message: "No todos Found !" });
    }
    return res.status(200).json({ todosData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Eroor" });
  }
};

const deleteTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Todo id is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Todo id" });
        }

        const result = await Todo.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const updateTodos=async (req, res,next) => {
    try {
        const id=req.params.id;
        const data=req.body;
        await Todo.updateOne({ _id: id},{$set: data});
        return res.status(200).json({message:"Todo updated successfully"});
    } catch (error) {
        next(error);
        return res.status(400).json({message:"Todo not updated"})
    }
}

const toggleTodoCheck = async (req, res) => {
    const id = req.params.id; // Get the ID from the route parameters

    try {
        
        if (!id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }

        
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

    
        todo.isChecked = !todo.isChecked;

    
        const updatedTodo = await todo.save();

        res.status(200).json({
            message: `Todo ${todo.isChecked ? "checked" : "unchecked"} successfully`,
            todo: updatedTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating todo", error });
    }
};




const getSortedTodos = async (req, res) => {
  const { sortOrder } = req.query;
  try {
    const todos = await Todo.find().sort({ dueDate: sortOrder === "desc" ? -1 : 1 });
    res.status(200).json({ message: "Tasks retrieved successfully", todos });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Failed to retrieve tasks", error: error.message });
  }
};

module.exports= { todos, getTodos,deleteTodo ,updateTodos,toggleTodoCheck,getSortedTodos};