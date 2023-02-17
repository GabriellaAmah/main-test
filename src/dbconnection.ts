import {config} from "./config"
import mongoose, {ConnectOptions, Connection, Error} from "mongoose";

class Dbconnection {
    isTest: boolean
    connection: Connection | any
    shouldRetry: boolean

    constructor(isTest = false, shouldRetry = true){
        this.isTest = isTest;
        this.connection = null
        this.shouldRetry = shouldRetry
    }

    async connect(url: string): Promise<void> {
       try{
        const mongodb_url = this.isTest ? await this.getTestUrl() : url

        await mongoose.connect(mongodb_url, {
            retryWrites: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)

        this.connection = mongoose.connection

        this.connection.on("error" , (err: any) => {
            console.log(`Unable to connect to database because ${err}`)
        })

        this.connection.once("open", () => {
            console.log("Mongoose database connection established.");
          });

          this.connection.on("disconnected", () => {
            console.log(
              `MongoDB disconnected.${
                this.shouldRetry ? "  Attempting to reconnect..." : ""
              }`
            );
          });

          this.connection.on("reconnected", () => {
            console.log("Mongoose reconnected.");
          });

       }catch(error: any){
        return error
       }
    }

    async getTestUrl() : Promise<string>{
        return "url"
    }

    async disconnect(): Promise<any> {
        this.connection.removeAllListeners("error");
        this.connection.removeAllListeners("open");
        this.connection.removeAllListeners("disconnected");
        this.connection.removeAllListeners("reconnected");
        await mongoose.disconnect();
      
        return this;
      }
}

export const db = new Dbconnection(
    config.NODE_ENV == "test",
    config.NODE_ENV !== "test"
)

module.exports = {
    db,
    Dbconnection
}
