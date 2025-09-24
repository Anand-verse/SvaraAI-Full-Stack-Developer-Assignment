import express from 'express';
import {createProject, deleteProject ,listProjects} from '../project/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createProject);
router.get('/' , authMiddleware, listProjects);
router.delete('/:id' ,authMiddleware, deleteProject);

export default router;