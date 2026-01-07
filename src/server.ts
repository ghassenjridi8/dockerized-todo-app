import * as dotenv from 'dotenv'
import * as path from 'path';
const result = dotenv.config();

if (result.error) {
    console.log(`error laoading env variables, aborting...`)
    process.exit(1);
}

console.log(process.env.PORT);

import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';
import { logger } from './logger';
import { defaultErrorHandler } from './middleware/default-error-handler';
import { register } from './routes/register';
import { login } from './routes/login';
import { getTodos } from './routes/get-todos';
import { checkIfAuthenticated } from './middleware/authentication-middleware';
import { createTodo } from './routes/create-todo';
import { deleteTodo } from './routes/delete-todo';
import { updateTodo } from './routes/update-todo';


const app = express();


function setupExpress(){

    app.use(express.json());

    app.use(express.static(path.join(process.cwd(), "public")));

    app.route("/").get(root);

    app.route("/todos").get(checkIfAuthenticated,getTodos);

    app.route("/todos").post(checkIfAuthenticated,createTodo);

    app.route("/todos/:todoId").patch(checkIfAuthenticated,updateTodo);

    app.route("/todos/:todoId").delete(checkIfAuthenticated,deleteTodo);

    app.route("/auth/register").post(register);

    app.route("/auth/login").post(login);

    /*
    //get all todos for a user
    app.route("/:userId/todos").get(getAllTodos);

    app.route("/:userId/todos").get(createTodo);
    //update a todo
    app.route(/:id).put(updateTodo);

    //delete a todo
    app.route(/:id).delete(deletetodo);

    app.route("/login").post(login);*/

    app.use(defaultErrorHandler);

}

function startServer(){

    let port: number;

    const portArg = process.argv[2];

    const portEnv = process.env.PORT;

    if (isInteger(portEnv)){
        port = parseInt(portEnv);
    }

    if (!port && isInteger(portArg)){

        port = parseInt(portArg);
    
    }

    if (!port){

        port = 9000;
    }


    



    console.log(`PORT is ${port}`)





    app.listen(port, () => {
        logger.info(`v2 HTTP REST API server is now running at http://localhost:${port}`);
    });
}



setupExpress();
startServer();



