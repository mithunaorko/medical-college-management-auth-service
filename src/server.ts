import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import {logger, errorLogger} from './shared/logger'
import {Server} from 'http'

// error handle for uncaught exception 
process.on('uncaughtException', error => {
  // console.log('😞 Uncaught exception is detected...')
  errorLogger.error(error);
  process.exit(1)
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database successfully connected`)

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connected database', error)
  }

  // error handling for unhandled rejection
  process.on('unhandledRejection', error => {
    if(server){
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    }else{
      process.exit(1)
    }
  })
};


main()

// error handle for sigterm 
process.on('SIGTERM', () => {
  // logger.info('😞 SIGTERM is received');
  logger.info('SIGTERM is received')
  if(server){
    server.close()
  }
})

// console.log(x)