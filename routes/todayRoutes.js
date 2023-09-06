const {Router} = require('express');

const Today = require('../database/models/todayListModel');
const log = console.log;

const todayRoutes = () => {
    const todayRouter = Router();

    todayRouter.route('/lists')
    //Get All Todos for Today
    .get(async (req, res) => {
        try {
            const todayLists = await Today.find();
            res.status(200);
            return res.json(todayLists);
        } catch (error) {
            res.status(500)
            log(error);
            return res.json({error})
        }
    })
    //Add New New Todo
    .post(async (req, res) => {
        const {name} = req.body;

        const newTodo = new Today({title: name})
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
            await Today.deleteMany();
            res.status(200);
            return res.json({message: 'All documents successfully deleted.'})
        } catch (error) {
            res.status(500);
            return res.json({error})
        }
    });

    todayRouter.route('/lists/:id')
    .get(async (req, res) => {
        const {id} = req.params;
        try {
            const todo = await Today.findById(id);

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
        const updatedTodo = await Today.findOneAndUpdate({_id: id}, {title: name}, {new: true});
        log(updateDetails);
        res.status(201);
        return res.json({message: 'Update Successful', updatedTodo})
       } catch (error) {
         res.status(500)
         return res.json({error})
       }
    })
    .delete( async (req, res) => {
        const {id} = req.params;
        try {
            const deletedDetaills = await Today.deleteOne({_id: id});
            log(deletedDetaills);
            res.status(200);
            res.json({message: 'Task Deleted Successfully.'})
        } catch (error) {
            res.status(500);
            return res.json({error})
            
        }
    })

    return todayRouter;
}

module.exports = todayRoutes;