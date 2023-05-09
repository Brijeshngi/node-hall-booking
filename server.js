import app from "./app.js";
import { connectMongoDBAtlas } from "./config/database.js";
connectMongoDBAtlas();

app.listen(process.env.PORT, () => {
  console.log(`Server Working on ${process.env.PORT}`);
});
