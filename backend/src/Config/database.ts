import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = mongoose.connection;

mongoose.connect(process.env.DATABASE || '').catch(err => console.log(`BD ERROR: ${err}`));

//En caso de conectarse
db.once('open', _ => {
  console.log(`BD de ${process.env.NODE_ENV} conectada`);
});

// //En caso de error
db.on('error', err => {
  console.log(`BD ERROR:${err}`);
});

export default db;
