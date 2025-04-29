import {Request, Response} from 'express';
import {TaskModel, TaskStatus} from "../models/Tasks";

export const TaskController = {
    getAllTasks: (req: Request, res: Response): void => {
        const tasks = TaskModel.getAllTasks();
        res.status(200).json(tasks);
    },

    createTask: (req: Request, res: Response): void => {
        const {title, description} = req.body;

        if (!title || title.trim() === '') {
            res.status(400).json({error: 'Title is required'});
            return;
        }

        const newTask = TaskModel.createTask(title, description || '');
        res.status(201).json(newTask);
    },

    updateTaskStatus: (req: Request, res: Response): void => {
        const {id} = req.params;
        const {status} = req.body;

        const statusNumber = Number(status);

        // Check if status is a valid number in the TaskStatus enum
        if (isNaN(statusNumber) ||
            !Object.values(TaskStatus).includes(statusNumber)) {
            res.status(400).json({
                error: 'Valid status is required',
                allowedValues: Object.values(TaskStatus).filter(v => !isNaN(Number(v)))
            });
            return;
        }

        const updatedTask = TaskModel.updateTaskStatus(id, statusNumber);

        if (!updatedTask) {
            res.status(404).json({error: 'Task not found'});
            return;
        }

        res.status(200).json(updatedTask);
    },

    updateTask: (req: Request, res: Response): void => {
        const {id} = req.params;
        const updates = req.body;

        if (updates.id) {
            delete updates.id;
        }

        // Convert status to number if it exists in the updates
        if (updates.status !== undefined) {
            const statusNumber = Number(updates.status);

            if (isNaN(statusNumber) ||
                !Object.values(TaskStatus).includes(statusNumber)) {
                res.status(400).json({
                    error: 'Valid status is required',
                    allowedValues: Object.values(TaskStatus).filter(v => !isNaN(Number(v)))
                });
                return;
            }

            updates.status = statusNumber;
        }

        const updatedTask = TaskModel.updateTask(id, updates);

        if (!updatedTask) {
            res.status(404).json({error: 'Task not found'});
            return;
        }

        res.status(200).json(updatedTask);
    },

    deleteTask: (req: Request, res: Response): void => {
        const {id} = req.params;
        const deletedTask = TaskModel.deleteTask(id);

        if (!deletedTask) {
            res.status(404).json({error: 'Task not found'});
            return;
        }

        res.status(200).json({message: 'Task deleted successfully', task: deletedTask});
    }
};