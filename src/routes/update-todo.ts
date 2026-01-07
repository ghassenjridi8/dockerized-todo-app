import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { isInteger } from "../utils";
//import db from "../db";
import { prisma } from "../prismaClient";



export async function updateTodo(request: Request, response: Response, next: NextFunction){

    try{
        logger.debug(`called updateTodo()`);

        const { todoId } = request.params;

        const {completed} = request.body;

        const {user_id} = request["userId"];

        //const todoId = request.params.todoId ; 

        if (!isInteger(todoId)){
                    throw `Invalid course id ${todoId}`;
                }

        //const updatedTodo =  db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
        //updatedTodo.run(completed, todoId);

        const updatedTodo = await prisma.todo.update({
            where: {
                userId: user_id,
                id: parseInt(todoId),
            },
            data: {
                completed: !!completed
            }

        })
        response.status(200).json({
            message: `todo ${todoId} has been updated`
        });

        


    }

   


    catch(error){

        logger.debug('error executing updateTodo(');
        return next(error);

    }
}

