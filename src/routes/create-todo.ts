import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
//import db from "../db";
import { prisma } from "../prismaClient";



export async function createTodo(request: Request, response: Response, next: NextFunction){


try{


    logger.debug(`Called createTodo`);

    const { task } = request.body;

    if (!task){
            throw `no data available, cannot save course.`
        }

    const user_id = request["userId"];


    //const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`);
    //const result = insertTodo.run(user_id, task);
    //const task_id = result.lastInsertRowid;

    const todo = await prisma.todo.create({
                data: {
                    task: task,
                    userId: user_id
                }
            })
    


     response.status(200).json({
            //id: task_id, 
            id: task.id,
            userId: user_id,
            task,
            completed:0
        });








}


catch(error){

logger.error(`error calling createTodo`);
return next(error);

}




}