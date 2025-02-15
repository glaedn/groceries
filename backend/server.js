require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const groceryRoutes = require("./routes/groceryRoutes");



const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/grocery", groceryRoutes);
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
