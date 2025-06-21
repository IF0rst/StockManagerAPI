import database from "../db.js";
import bcrypt from "bcrypt";
import {v4} from "uuid";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const createToken = (userId) => {
    return jwt.sign({user_id : userId}, process.env.JWT_SECRET, {expiresIn: '15m'})
}

export const register = (username, password) => {
    const stmtUser = database.prepare("SELECT username FROM user WHERE username = :username");
    const row = stmtUser.get({username});

    if (row) {
        throw new Error("user already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = v4();

    const stmt = database.prepare("INSERT INTO user (user_id, username, password_hash) VALUES (:userId, :username, :passwordHash)");
    stmt.run({
        userId: userId, username: username, passwordHash: hashedPassword,
    });
};

export const login = (username, password) => {
    const stmtUser = database.prepare("SELECT user_id,password_hash FROM user WHERE username = :username");
    const row = stmtUser.get({username});

    if (!row) {
        throw new Error("Invalid username or password");
    }
    if (!bcrypt.compareSync(password, row.password_hash)) {
        throw new Error("Invalid username or password");
    }

    const token = createToken(row.user_id)
    return token
}

export const checkJWT = (_jwt) => {
    if (jwt.verify(_jwt, process.env.JWT_SECRET)) {
        const {user_id} = jwt.decode(_jwt, process.env.JWT_SECRET)

        if (!user_id) {
            throw new Error("Invalid JWT!");
        }

        const stmtUser = database.prepare("SELECT user_id,username FROM user WHERE user_id = :userId");
        const row = stmtUser.get({userId : user_id});

        return row
    } else {
        throw new Error("invalid JWT!")
    }
}