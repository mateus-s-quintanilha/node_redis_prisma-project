import express from "express";
import UserController from "./controllers/UserController";
import redis from "./lib/cache";

const app = express()

app.get('/', (req, res) => res.send('It is working'))

app.get('/users', (req, res) => UserController.find(req, res))

app.get('/clear-cache', async (req, res) => {
    await redis.del('users:all');
    return res.json({
        ok: true
    })
})

app.listen(3000, () => console.log('Server is now running at http://localhost:3000'))