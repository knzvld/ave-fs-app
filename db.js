const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const Admin = require('./models/adminModel')

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

(async function(){
  try {

    const candidate = await Admin.findOne({
      login: process.env.ADMIN
    })
  
    if(candidate){
        console.log("Admin already created")
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = process.env.PASSWORD
        await Admin.create({
            login: process.env.ADMIN,
            password: bcrypt.hashSync(password, salt)
        })
    } 
  } catch (error) {
    console.log(error)
  }
})()
