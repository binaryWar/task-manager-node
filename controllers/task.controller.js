const Task = require("../models/Task");

const fetchTaskList = async(req,res,next)=>{
    const {id} = req.query;
    const {userId} = req.headers;
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
            message : "Task/Tasks found",
            tasks : task
        });
    }catch(error){
        res.status(500).json({ message: err.message });
    }
}


const updateTask = async(req,res,next)=>{
    const { title, description, status } = req.body;
    const { id } = req.params;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const deleteTask = async(req,res,next)=>{
    const { id } = req.params;

    try {
        // Find the task by id and delete it
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const createTask = async(req,res,next)=>{
    try{
        const {title,description} = req.body;

        const task = new Task({
            title,
            description
        });
        await task.save();
        res.status(200).send({
            message : "Task Created",
            id : task._id,
            title : task.title,
            description : task.description,
            createdAt : task.createdAt
        })
    }catch(error){
        res.status(500).json({ message: err.message });
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

    let searchQuery = { createdBy: { $exists: true, $ne: null } };
    
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