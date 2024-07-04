import * as User from ".././model/user.js";

export async function login(req, res) {
    const {email, password} = req.body;
    if(!email){
        return res.status(400).send("Missing email")
    }else if (!password) {
        return res.status(400).send("Missing password")
    }

    const result = await User.login(email, password);
    if(result.error) {
        return res.status(400).send(result.message)
    }
    if(result.success) {
        return res.status(200).send(result.token);
    }
    return res.status(500).send("unknown error")
}

export async function register(req, res) {
    const {username, email, password} = req.body;
    if(!email){
        return res.status(400).send("Missing email")
    }else if (!password) {
        return res.status(400).send("Missing password")
    }else if (!username) {
        return res.status(400).send("Missing username")
    }

    const result = await User.register(email, username, password);
    if(result.error) {
        return res.status(400).send(result.message)
    }
    if(result.success) {
        return res.status(200).send(result.token);
    }
    return res.status(500).send("unknown error")
}
