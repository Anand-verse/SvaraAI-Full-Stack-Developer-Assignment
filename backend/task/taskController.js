import Task from '../models/Taskmodel.js';

export const listTasksByProject = async (req,res)=>{
    try {
        const {projectId} = req.params;
        const { status, priority, deadline, page = 1, limit = 10 } = req.query;

         const filter = { projectId: projectId };
        if (status) {
            filter.status = status;
        }
        if (priority) {
            filter.priority = priority;
        }
        if (deadline) {
            filter.deadline = { $lte: new Date(deadline) };
        }

                const skip = (page - 1) * limit;

        const tasks = await Task.find(filter)
                               .skip(skip)
                               .limit(parseInt(limit)); 

        const totalTasks = await Task.countDocuments(filter);

        res.status(200).json({
            tasks,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks
        });
    } catch (err) {
      console.error(err)  
      res.status(500).json({msg:'Error fetching Tasks'})
    }
}

export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, status, priority, deadline } = req.body;

        const newTask = new Task({
            projectId,
            title,
            status,
            priority,
            deadline
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: 'Task creation failed', error: error.message });
    }
};

export const editTask = async (req,res)=>{
    try {
        const {projectId , id} =req.params;
        const updatedBody = req.body;

        const task = await Task.findByIdAndUpdate(
            id,
            updatedBody,
            { new: true, runValidators: true }
        )

        if(!task){
              return res.status(404).json({ message: 'Task not found' });
        }

         if (task.projectId.toString() !== projectId) {
      return res.status(401).json({ message: 'Unauthorized: Task does not belong to the specified project' });
    }

        res.status(200).json(task)
    } catch (err) {
       console.error(err);
       res.status(400).json({msg:"Task update fail"}) ;
    }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting task' });
  }
};