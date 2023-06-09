import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function main() {
    try{
        await mongoose.connect(config.database_url as string);
        console.log(`Database successfully connected`);
        
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })
    }catch(err){
        console.log("Failed to connected database", err);
    }
  };

  main();

  