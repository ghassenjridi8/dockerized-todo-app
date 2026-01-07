import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
//import db from "../db";
import { prisma } from "../prismaClient";


export async function getTodos(request: Request, response: Response, next: NextFunction){


try {
      
      logger.debug(`getTodos()`);
      
      const userId = request["userId"]; 

      if (!userId){
            logger.info(`no userid provided`);
      }

      logger.debug(`todos for user ${userId}`)

      //const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
      //const todos = getTodos.all(userId);

      const todos = await prisma.todo.findMany({
            where: {
                  userId: userId
            }
      });

      response.status(200).json(todos);



}

catch(error){

        logger.error(`error executing getTodos()`);
        return next(error);

}


}