const Task = require("../models/Task");
const {CustomError,BadRequestError} = require("../config/customError");

const fetchTaskList = async(req,res,next)=>{
    const {id} = req.query;
    const {userId} = req.user;
    
    try{
        let task;
        if(id){
            task = await findTaskById(id);
        }else{
            task = await findTasksByCreatedBy(userId,req.query);
        }
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send({
            message : "Tasks found",
            tasks : task
        });
    }catch(error){
        next(error);
    }
}


const updateTask = async(req,res,next)=>{
    const { title, description, status } = req.body;
    const { id } = req.params;

    try {
        if(!id) throw new BadRequestError("Invalid Payload")
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
}

const deleteTask = async(req,res,next)=>{
    const { id } = req.params;

    try {
        if(!id) throw new BadRequestError("Invalid request");
        // Find the task by id and delete it
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).json({ message: 'Task deleted successfully', deletedTask });
    } catch (err) {
        next(err);
    }
}

const createTask = async(req,res,next)=>{
    try{
        const {title,description} = req.body;
        const {userId} = req.user;
        if(!title || !description)
            throw new BadRequestError("Invalid payload");

        const task = new Task({
            title,
            description,
            createdBy : userId
        });
        await task.save();
        res.status(200).send({
            message : "Task Created",
            _id : task._id,
            title : task.title,
            description : task.description,
            createdAt : task.createdAt
        })
    }catch(error){
        next(error);
    }
}
const findTasksByCreatedBy = (createdBy,query)=>{
    const { search , orderby } = query;
    let sortOrder = {};
    if (orderby === 'recent') {
      sortOrder.createdAt = -1;
    } else if (orderby === 'oldest') {
      sortOrder.createdAt = 1;
    }

    let searchQuery = { createdBy };

    if (search) {
      searchQuery.title = { $regex: search, $options: 'i' };
    }

    return Task.find(searchQuery).sort(sortOrder);
}

const findTaskById = (id)=>{
    return Task.findById(id);
}
module.exports = {
    fetchTaskList,
    updateTask,
    deleteTask,
    createTask
}