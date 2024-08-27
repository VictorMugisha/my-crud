const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const UserModel = require("./models/User.js")
const { default: mongoose } = require("mongoose")

const app = express()

dotenv.config()

const MONGODB_CONNECTION = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(MONGODB_CONNECTION)
    .then(() => {
        console.log("Database connected....")
        app.listen(PORT, () => {
            console.log("Server is running on port ", PORT)
        });
    })
    .catch((error) => console.log(error));


// Getting all users
app.get("/", async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Getting a single user
app.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserModel.findById(id)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Creating a new user
app.post("/create", async (req, res) => {
    const body = req.body;
    try {
        const user = new UserModel(body);
        await user.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating a user
app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const user = await UserModel.findByIdAndUpdate(id, body);
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({ error, message: "Failed to find and update a user" });
    }
});

// Deleting a user
app.delete("delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            res.status(404).send("User not found");
        }
        await user.remove();
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(501).send(error)
    }
})