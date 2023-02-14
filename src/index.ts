import http from "http";
import {app, build} from "./server"
import {db} from "./dbconnection"
import {config} from "./config"

async function startServer() : Promise<void> {
  try{
    const httpServer = http.createServer(build())

    await db.connect(config.MONGODB_URL)

    const port = config.PORT || 8080

    console.log(port)

    httpServer.listen(port, () => {
        console.log(`server listening on port ${port}`)
    })
  }catch(error){
    console.error(error, "Fatal server error");
  }
}

startServer()