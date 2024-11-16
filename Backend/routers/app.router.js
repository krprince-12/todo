const express = require("express");
const Todos = require("../controllers/app.controller.js");

const router = express.Router(); // Correct usage of express.Router()

// Define routes
router.route('/post').post(Todos.todos);
router.route('/getTodos').get(Todos.getTodos);
router.route('/deleteTodos/:id').delete(Todos.deleteTodo);
router.route('/updateTodos/:id').put(Todos.updateTodos);
router.route("/toggleCheck/:id").put(Todos.toggleTodoCheck);
router.route("/getSortedTodos").get(Todos.getSortedTodos);

module.exports = router; // Export the router correctly
