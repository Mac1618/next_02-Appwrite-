import mongoose from "mongoose";


export const connect = async () => {
  try {
                    // "!" means the code when handle it because the link work fine.
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    // connection
    connection.on('connected', () => {
      console.log('MongoDB connected successfully!', process.env.MONGO_URI!)
    })

    // error
    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running ' + err );
      process.exit(); // close mongodb connection
    })


  // catch the error 
  } catch (error) {
    console.log('Something when wrong!')
    console.log(error)
  }
}