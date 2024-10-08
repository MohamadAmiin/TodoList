import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TodoModel from "./Models/Todo.js";

const app = express();
const PORT = 3333;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id" , (req , res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done:true})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete('/delete/:id' , (req , res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})




app.listen(PORT, () => {
  console.log(`server is Running on port ${PORT}`);
});
