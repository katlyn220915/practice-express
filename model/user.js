import * as db from "../util/database.js";

export async function login(email, password){
    const result = await db.login(email, password);
    return result
}

export async function register(email, userName, password){
    const result = await db.register(email, userName, password);
    return result
}
