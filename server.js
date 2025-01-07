const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.use(express.json());

// MongoDB Connection
const uri ='mongodb+srv://eraianbu:erai2212@cluster0.nmmlkfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(uri, {dbName:"CRS", useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Mongoose Schema and Model
const dataSchema = new mongoose.Schema({
    timestamp:{type:String},
    north_south_angle: {type:String},
    east_west_angle: {type:String}
});

const datas = mongoose.model('Data', dataSchema);
const Model = mongoose.model('Model', {}, 'Data');

// API Route
app.get('/data', async (req, res) => {
    
    try {
        const data = await Model.find()// Sort by timestamp descending
        console.log(data, "test")
        res.status(200).json(data);
    } catch (err) {
        res.status(10).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});