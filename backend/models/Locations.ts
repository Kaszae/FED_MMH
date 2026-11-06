import { Schema, model } from 'mongoose'

const locationSchema = new Schema({
    id: { type: Number, required: true, unique: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: true, min: 52.3, max: 52.7},
    longitude: { type: Number, required: true, min: 13.0, max: 13.8 },
    street: { type: String },
    city: { type: String },
    zip: { type: Number },
    pos_neg_impact: { type: String, required: true, enum: ['positive', 'negative'] },
    likes: { type: Number, required: true, default: 0 },
    image: { type: String }
});
// TODO Validierung für das Bild ergänzen
export const Location = model('Location', locationSchema);