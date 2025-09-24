import express from 'express';
import {createTask, listTasksByProject ,editTask,deleteTask} from '../task/taskController.js';

const router = express.Router();

router.get('/:projectId/tasks', listTasksByProject) ;
router.post('/:projectId/tasks' , createTask);
router.put('/:projectId/tasks/:id', editTask);
router.delete('/:projectId/tasks/:id', deleteTask); 

export default router;