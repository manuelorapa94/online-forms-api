// src/server.ts
import app from "./app";

import { PORT } from "./config";
import setup from "./setup";
import { connectToMongo } from "./utils/mongo";

// Connect to MongoDB
connectToMongo()
  .then(() => {
    // Run setup
    setup();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
