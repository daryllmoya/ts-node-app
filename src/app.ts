import express from "express";

import routes from "./routes";

const app = express();

// Use the built-in express.json() middleware
app.use(express.json());

const corsOptions = {
  origin: "*", // Allow access from all domains
};

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
