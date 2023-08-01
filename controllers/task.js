import errorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"


export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        await Task.create({
            title,
            description,
            user: req.user,
        })

        res.status(201).json({
            success: true,
            message: "New Task added"
        })

    } catch (error) {
        next(error)
    }

}
export const getMyTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
        if (!tasks) return next(new errorHandler("You have not added any tasks yet!", 404))


        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)

    }
}



export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new errorHandler("Task not Availbale", 404))

        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(200).json({
            success: true,
            message: "Task updated successfully"
        })


    } catch (error) {
        next(error)
    }

}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return next(new errorHandler("No Task Availbale", 404))


        await task.deleteOne()
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })


    } catch (error) {
        next(error)
    }

}