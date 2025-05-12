const services = require('../data/services.json');
const Service = require('../models/serviceModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

dotenv.config({path:'backend/config/config.env'})
connectDatabase();

const seedServices = async ()=>{
    
    try{
        await Service.deleteMany();
        console.log('Services Deleted!');

        await Service.insertMany(services);
        console.log('All services added!');
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}

seedServices(); 