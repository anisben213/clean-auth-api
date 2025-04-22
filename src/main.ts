import app from "./app";
import ConnectDb  from "./infrastructure/database/ConnectDb";
import dotenv from "dotenv";

dotenv.config();
// Connect to the database

const PORT = 50000;
app.listen(PORT, () => {
  ConnectDb()
    .then(() => {
      console.log("Connected to the database successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
});
