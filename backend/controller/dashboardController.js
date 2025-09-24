import Project from '../models/Projectmodel.js';
import Task from '../models/User.js';

export const getDashboardSummary = async (req, res) => {
    try {
        const today = new Date();

        const [
            totalProjects,
            todoCount,
            inProgressCount,
            doneCount,
            overdueCount,
        ] = await Promise.all([
            Project.countDocuments(),
            Task.countDocuments({ status: 'todo' }),
            Task.countDocuments({ status: 'in-progress' }),
            Task.countDocuments({ status: 'done' }),
            Task.countDocuments({ deadline: { $lt: today }, status: { $ne: 'done' } }),
        ]);

        res.status(200).json({
            totalProjects,
            tasksByStatus: {
                todo: todoCount,
                inProgress: inProgressCount,
                done: doneCount,
            },
            overdueTasks: overdueCount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard summary', error: error.message });
    }
};