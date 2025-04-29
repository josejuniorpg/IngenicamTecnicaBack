export enum TaskStatus {
    TODO = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

// In-memory array to store tasks
let tasks: Task[] = [];

let idCounter: number = 1;

// Generate a new ID
const generateId = (): string => {
    return (idCounter++).toString();
};

export const TaskModel = {
    getAllTasks: (): Task[] => {
        return tasks;
    },

    createTask: (title: string, description: string = ""): Task => {
        const newTask: Task = {
            id: generateId(),
            title,
            description,
            status: TaskStatus.TODO // Default status is TODO (1)
        };
        tasks.push(newTask);
        return newTask;
    },

    getTaskById: (id: string): Task | undefined => {
        return tasks.find(task => task.id === id);
    },

    updateTaskStatus: (id: string, status: TaskStatus): Task | null => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = status;
            return tasks[taskIndex];
        }
        return null;
    },

    updateTask: (id: string, updates: Partial<Task>): Task | null => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {...tasks[taskIndex], ...updates};
            return tasks[taskIndex];
        }
        return null;
    },

    deleteTask: (id: string): Task | null => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const deletedTask = tasks[taskIndex];
            tasks.splice(taskIndex, 1);
            return deletedTask;
        }
        return null;
    }
};

// Add example tasks
TaskModel.createTask("Buy milk", "Remember to get skim milk");
const secondTask = TaskModel.createTask("Exercise", "30 minutes of cardio");
TaskModel.updateTaskStatus(secondTask.id, TaskStatus.IN_PROGRESS);