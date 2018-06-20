import { Request, Response, NextFunction } from "express";

export let index = (req:Request, res:Response, next:NextFunction) => {
    res.marko(require("../views/index.marko"), {
        message: "Hello, World!!!"
    });
};
