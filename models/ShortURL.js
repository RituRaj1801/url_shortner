import mongoose from "mongoose";

const ShortURLSchema = new mongoose.Schema({
    long_url: {
        type: String,
        required: true
    },
    short_code: {
        type: String,
        required: true,
        unique: true
    },
    short_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const ShortURL = mongoose.model(process.env.COLLECTION_NAME, ShortURLSchema);
export default ShortURL;
