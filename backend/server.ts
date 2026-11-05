import 'dotenv/config'
import crypto, {randomUUID} from 'node:crypto'
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from './models/User.js'; // js statt ts ist für "type": module die übliche Schreibweise
import { Location } from './models/Locations';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const mongooseUri = process.env.MONGODB_URI;
if (!mongooseUri) throw new Error('MongoDB_URI fehlt in der .env');
await mongoose.connect(mongooseUri);

const app: Express = express();
app.use(express.json()) // Zum Einlesen von req.body
const port: number = Number(process.env.PORT) || 3000;

const jwtSecret: string =
    process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`)
})

app.post('/api/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        // bcrypt vergleicht Passwörter als Hash gegen Brute-Force Attacks
        return res.status(401).json({ message: 'Ungültige Zugangsdaten' });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: '1h' }
    );

    res.json({ token });
})

app.post('/api/locations', async (req: Request, res: Response) => {
    const { title, description, latitude, longitude, street, city, zip, pos_neg_impact, likes, image } = req.body;

    try {
        const location = new Location(
            title,
            description,
            latitude,
            longitude,
            street,
            city,
            zip,
            pos_neg_impact,
            likes,
            image


    )
    }
})