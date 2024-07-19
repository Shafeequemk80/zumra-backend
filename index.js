const express = require("express");
const mongoose = require("mongoose");
const Counter = require("./CounterModel");
var cors = require('cors')
const app = express();
const PORT = 5000;


app.use(express.static("public"));
app.use(express.json());
mongoose.connect("mongodb+srv://shafeequemk80:tFTt2oBnNIHFZCc7@cluster0.7scgnqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  try {
    const counterData = await Counter.find();
    console.log(counterData);
    res.json(counterData)
  } catch (error) {
    console.error("Error rendering index:", error.message);
    res.status(500).send("An error occurred");
  }
});
app.post("/", async (req, res) => {
    try {
        const { name, unit } = req.body;
        console.log(req.body, 'Received data');

        // Create and save a new Counter document
        const savedData = await Counter.create({ name, unit });

        // Retrieve all documents from the Counter collection
        

        // Respond with the saved data and the list of all counters
        res.json({ data: req.body, message: 'Data saved successfully' });
    } catch (error) {
        // Handle any errors that occur during the operations
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
