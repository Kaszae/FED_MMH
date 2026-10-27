import 'dotenv/config'
import crypto from 'node:crypto'
import express, {Express} from 'express';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

const jwtSecret: string =
    process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`)
})
