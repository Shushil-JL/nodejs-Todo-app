import { Task } from "../models/task.js"


export const newTask = async (req, res) => {
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
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
export const getMyTask = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
        if (!tasks) return res.status(404).json({
            success: false,
            message: "You have not added any task yet"
        })

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}



export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({
            success: false,
            message: "Task not Available"
        })
        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(200).json({
            success: true,
            message: "Task updated successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({
            success: false,
            message: "Task not Available"
        })


        await task.deleteOne()
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}