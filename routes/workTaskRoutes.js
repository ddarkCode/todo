const {Router} = require('express');

const WorkTask = require('../database/models/workTaskModel');
const log = console.log;

const WorkTaskRoutes = () => {
    const workTaskRouter = Router();

    workTaskRouter.route('/lists')
    //Get All Todos for Work
    .get(async (req, res) => {
        try {
            const workList = await WorkTask.find();
            res.status(200);
            return res.json(workList);
        } catch (error) {
            res.status(500)
            log(error);
            return res.json({error})
        }
    })
    //Add New New Todo
    .post(async (req, res) => {
        const {name} = req.body;

        const newTodo = new WorkTask({title: name})
        try {
            await newTodo.save()
            res.status(201);
            return res.json(newTodo)
        } catch (error) {
            res.status(500);
            return res.json({error});
        }
    })
    .delete(async (req, res) => {
        try {
            await WorkTask.deleteMany();
            res.status(200);
            return res.json({message: 'All documents successfully deleted.'})
        } catch (error) {
            res.status(500);
            return res.json({error})
        }
    });

    workTaskRouter.route('/lists/:id')
    .get(async (req, res) => {
        const {id} = req.params;
        try {
            const todo = await WorkTask.findById(id);

            if (!todo) {
                res.status(404);
                return res.json({message: 'Todo Not Found.'})
            }

            res.status(200);
            return res.json(todo);
        } catch (error) {
            res.status(500);
            return res.json({error});
        }

    })
    .patch(async (req, res) => {
        const {id} = req.params
        const {name} = req.body;
       try {
        log('In Update Route')
        const updatedTodo = await WorkTask.findOneAndUpdate({_id: id}, {title: name}, {new: true});
        log(updatedTodo);
        res.status(201);
        return res.json({message: 'Update Successful', updatedTodo})
       } catch (error) {
        log(error);
         res.status(500)
         return res.json({error})
       }
    })
    .delete( async (req, res) => {
        const {id} = req.params;
        try {
            const deletedDetaills = await WorkTask.deleteOne({_id: id});
            log(deletedDetaills);
            res.status(200);
            res.json({message: 'Task Deleted Successfully.'})
        } catch (error) {
            res.status(500);
            return res.json({error})
            
        }
    })

    return workTaskRouter;
}

module.exports = WorkTaskRoutes;