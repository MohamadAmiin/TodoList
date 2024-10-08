import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    task : String, 
    done : {
        type : Boolean,
        default : false
    }
})

const TodoModel = mongoose.model("todos" , TodoSchema)
// module.exports = TodoModel;

export default TodoModel;