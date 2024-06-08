import express from "express";

declare global {

    namespace Express {

        interface Request {

            user?: {
                id: string | number | unknown;
                email: string | unknown;
                role: string | unknown;
            };
    
        }

    }

}