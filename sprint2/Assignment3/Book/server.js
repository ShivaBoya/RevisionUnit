const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/Database");
const bookRoutes = require("./routes/Routes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book Library API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
