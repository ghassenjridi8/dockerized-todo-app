import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { isInteger } from "../utils";
//import db from "../db";
import { prisma } from "../prismaClient";



export async function deleteTodo(request: Request, response: Response, next: NextFunction){

    try{
        logger.debug(`called deleteTodo()`);

        const { todoId } = request.params
 
        const userId = request["userId"]; 

        logger.debug(`userId is ${userId}, todoId is ${todoId}`)

        if (!isInteger(todoId)){
                    throw `Invalid course id ${todoId}`;
                }

        //const deleteTodo =  db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');
        //deleteTodo.run(todoId, request["userId"]);

        const deletedTodo = await prisma.todo.deleteMany({
            where: {
                id: parseInt(todoId),
                userId: request["userId"]
            }
        })

        response.status(200).json({
            message: `todo ${todoId} has been deleted`});


    }

   


    catch(error){

        logger.debug('error executing deleteTodo(');
        return next(error);

    }
}

