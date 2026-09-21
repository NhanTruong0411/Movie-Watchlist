import express from "express";

// Import routes
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = 5001;

// Use routes
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
