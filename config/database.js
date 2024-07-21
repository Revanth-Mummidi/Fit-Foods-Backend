import mongoose from "mongoose";

export default   async () => {
  return mongoose
    .connect(process.env.MONGOOSE_CONNECTION_STRING)
    .then((event) => {
      console.log(`database connected with ${event.connection.host}`);
    })
    .catch(() => {
      console.log("error while connecting to database");
    });
};
