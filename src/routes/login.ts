import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import * as bcrypt from "bcrypt";
//import db from "../db";
import { prisma } from "../prismaClient";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;



export async function login(request: Request, response:Response, next: NextFunction){

    try{
        logger.debug(`called login()`);

        const {username, password} = request.body;

        if(!username){
            throw `could not extract email from the request, aborting!`;

        }


        if(!password){
            throw `could not extract password from the request, aborting!`;

        }

        //const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
        //const user = getUser.get(username);

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

         if (!user){

            const message = `login denied`;
            logger.info(`${message} - ${username} does not exist!`);
            response.status(403).json({message});
            return;


        }

        const passwordHash = user.password;

        const passwordIsValid = bcrypt.compareSync(password, passwordHash as string); 



        if (!passwordIsValid){

            const message = `login denied, wrong password`;
            logger.info(`${message} - user ${username} has entered the wrong password`);
            response.status(403).json({message})
            return;

        }


        logger.info(`User ${username} has now logged in`);


        const authJwt = {
            id: user.id,
            username: user.username
            
        };

        const token = jwt.sign(authJwt, JWT_SECRET);

        /*response.status(200).json({
            user: {
                username, 
            },
            token
            
        });*/

        //response.status(200).json({token})
        response.status(200).json({token});

    }


    catch(error){

        logger.error(`error calling login()`);
        return next(error);
    }
}


