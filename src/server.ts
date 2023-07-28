import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

// error handle for uncaught exception
process.on('uncaughtException', error => {
  // console.log('😞 Uncaught exception is detected...')
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database successfully connected`);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connected database', error);
  }

  // error handling for unhandled rejection
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// error handle for sigterm
process.on('SIGTERM', () => {
  // console.log('😞 SIGTERM is received');
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});

// console.log(x)
