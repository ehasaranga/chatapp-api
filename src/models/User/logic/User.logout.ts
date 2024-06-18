
import { User } from "@app/models/User/User";
import { endpoint, validate } from "@core";
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import ms from "ms";

export const UserLogin = endpoint({
    path: '/logout',
    method: 'post',
    baseRoute: true,
    handler: async (req, res) => {

        res.clearCookie('session')

        res.status(200);

    }
})