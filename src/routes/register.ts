import {NextFunction, Request, Response} from "express";
import { logger } from "../logger";
import * as bcrypt from "bcrypt";
//import db from "../db";
import { prisma } from "../prismaClient";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


export async function register(request: Request, response:Response, next: NextFunction){

    try{

        logger.debug(`called register()`)

        const {username, password} = request.body;

        if (!username){
            throw `no username available, cannot save course.`};

        if (!password){
            throw `no email available, cannot save course.`};

        /*const user =  db.prepare('SELECT * FROM users WHERE username = ?').get(username);


        if (user){

            const message = `user with email ${username} already exists, aborting.`
            logger.error(message);
            response.status(500).json({message});
            return;

        }*/

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        })


        if (existingUser){

            const message = `user with email ${username} already exists, aborting.`
            logger.error(message);
            response.status(500).json({message});
            return;}


        const passwordHash = bcrypt.hashSync(password, 8);

        console.log(`${passwordHash}`)

        //const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`);
        //const result = insertUser.run(username, passwordHash);

        const user = await prisma.user.create({
            data: {
                username,
                password: passwordHash
            }
        })

        

        const defaultTodo = `hello add your first todo`;

        //const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`);

        //insertTodo.run(result.lastInsertRowid, defaultTodo);

        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        /*const authJwt = {
            //userId: result.lastInsertRowid,
            id: user.id,
            //username: username
            username: user.username
            
        };*/

        const authJwt = {
            id: user.id,
            username: user.username
            
        };


        const token = jwt.sign(authJwt, JWT_SECRET);



        response.status(200).json({ token });

        //response.status(200).json({
            //username
        //})




    }

    catch(error){
        logger.error(`error executing register`);
        return next(error);
    }

}