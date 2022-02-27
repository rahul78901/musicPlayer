import mongoose from 'mongoose';

const uri="mongodb+srv://woner:Rahul12345678@cluster0.whvmu.mongodb.net/music?retryWrites=true&w=majority";

export default async (res) => {
  mongoose
  .connect(uri)
  .then(()=> {
    console.log('db connected');
    res();
  });
};
