import { connect, ConnectOptions } from 'mongoose';

export const MONGO_URI_LOCALHOST = 'mongodb://127.0.0.1:27017/semnasunkriswina';
export const MONGO_URI_STAGGING =
  'mongodb+srv://operatorshoutoutid:zjYSvUmoT8a6AnqL@cluster0.f5wb5.mongodb.net/semnasunkriswina';
export const MONGO_URI_PRODUCTION =
  'mongodb+srv://operatorshoutoutid:zjYSvUmoT8a6AnqL@cluster0.f5wb5.mongodb.net/semnasunkriswina';
export const MONGO_URI =
  process.env.NODE_ENV === 'development'
    ? MONGO_URI_LOCALHOST
    : process.env.NODE_ENV === 'staging'
    ? MONGO_URI_STAGGING
    : MONGO_URI_PRODUCTION;

const options: ConnectOptions = {
  autoIndex: true,
  autoCreate: true,
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // reconnectTries: 30, // Retry up to 30 times
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0
  // useFindAndModify: false,
};
const connectDB = (cb: Function) => {
  connect(MONGO_URI, options)
    .then(() => {
      cb();
    })
    .catch((error: any) => {
      console.error(error);
      process.exit(1);
    });
};

export default connectDB;
