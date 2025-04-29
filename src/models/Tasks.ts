// Task interface
export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

// In-memory array to store tasks
let tasks: Task[] = [];

// ID counter
let idCounter: number = 1;

// Generate a new ID
const generateId = (): string => {
    return (idCounter++).toString();
};

// Task model with CRUD operations
export const TaskModel = {
    getAllTasks: (): Task[] => {
        return tasks;
    },

    createTask: (title: string, description: string = ""): Task => {
        const newTask: Task = {
            id: generateId(),
            title,
            description,
            completed: false
        };
        tasks.push(newTask);
        return newTask;
    },

    getTaskById: (id: string): Task | undefined => {
        return tasks.find(task => task.id === id);
    },

    markTaskAsCompleted: (id: string): Task | null => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = true;
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
TaskModel.createTask("Exercise", "30 minutes of cardio");