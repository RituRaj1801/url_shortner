import express from "express";
import { join } from "path";
import connectDB from "./config/db.js";
import shortenRoutes from "./routes/shorten.js";
import ShortURL from "./models/ShortURL.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
    
app.set("view engine", "ejs");
app.set("views", join(process.cwd(), "public", "view"));
app.get('/template', (req, res) => {
    res.render("template",{'html': 'Hello World!'});
})
app.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "public", "view", "url_shortner.html"));
});
app.get("/testing", (req, res) => {
    const data = { status: true, status_code: 200, message: "website working" };
    res.json(data);
});
app.use("/api", shortenRoutes);

app.get('/:shortCode', async (req, res) => {
    try {
        const shortCode = req.params.shortCode;
        const urlEntry = await ShortURL.findOne({ short_code: shortCode });

        if (urlEntry) {
            return res.redirect(urlEntry.long_url); 
        } else {
            return res.status(404).send("URL not found!");
        }
    } catch (error) {
        console.error("Error fetching URL:", error);
        return res.status(500).send("Server error!");
    }
});

app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
app.use(express.static("public"));


