import 'dotenv/config'
import express, {Express, NextFunction, Request, Response} from 'express';
import crypto from 'node:crypto'
import mongoose from 'mongoose';
import { User } from './models/User.js'; // js statt ts ist für "type": module die übliche Schreibweise
import { Location } from './models/Locations';
import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';

const mongooseUri = process.env.MONGODB_URI;
if (!mongooseUri) throw new Error('MongoDB_URI fehlt in der .env');
await mongoose.connect(mongooseUri);

const app: Express = express();
app.use(express.json()) // Zum Einlesen von req.body
const port: number = Number(process.env.PORT) || 3000;

const jwtSecret: string =
    process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Kein Token angegeben' });
    }

    const token = header.slice(7); // "Bearer " ist 7 Zeichen lang
    try {
        const payload = jwt.verify(token, jwtSecret) as JwtPayload;
        res.locals.user = { id: payload.id, role: payload.role };
        next();
    } catch {
        return res.status(401).json({ message: 'Token ungültig oder abgelaufen' });
    }
}

function requireAdmin(_req: Request, res: Response, next: NextFunction) {
    if (res.locals.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Nur für Admins erlaubt' });
    }
    next();
}

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

app.use('/api/locations', authenticate) // Alle mit diesen Pfad verwenden authenticate

app.post('/api/locations', requireAdmin, async (req: Request, res: Response) => {
    const { title, description, latitude, longitude, street, city, zip, pos_neg_impact, likes, image } = req.body;

    const last = await Location.findOne().sort(({ id: -1})); // -1 für absteigende Sortierung
    let id = 1;
    if (last != null) id = last.id + 1;


    try {
        const location = new Location({
            id,
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
        });

        await location.save();

        return res.status(201).location(`/api/locations/${location.id}`).json(location);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
            return res.status(400).json({ message: 'Standort konnte nicht hochgeladen werden'});

        return res.status(500).json({message: 'Serverfehler'});
    }
})

app.get('/api/locations', async (req: Request, res: Response) => {
    const locations = await Location.find();
    return res.status(200).json(locations);
})

app.get('/api/locations/:id', async (req: Request, res:Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(404).json({ message: 'Ungültige ID' });


    const location = await Location.findOne({ id })
    if (location == null)
        return res.status(404).json({ message: 'Standort nicht gefunden'})

    return res.status(200).json(location);
})