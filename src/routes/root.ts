import { Request,Response } from "express";
import * as path from "path";


export function root(request: Request, response: Response){


    response.sendFile("index.html", {
        root: path.join(process.cwd(), "public")
    });

}


