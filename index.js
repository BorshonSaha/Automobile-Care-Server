const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2hugv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// for add services
client.connect(err => {
    const serviceCollection = client.db("automobile-care").collection("addService");

    app.post('/addService', (req, res) => {
        const newService = req.body;
        serviceCollection.insertOne(newService)
            .then(result => {
                console.log('Service added');
            })
    })

    app.get('/services', (req, res) => {
        serviceCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/delete/:id', (req, res) => {
        serviceCollection.deleteOne({_id: objectId(req.params.id)})
        .then(result => {
            console.log('deleted Successfully');
        })
    })

});


// for review
client.connect(err => {
    const reviewCollection = client.db("automobile-care").collection("review");

    app.post('/review', (req, res) => {
        const newReview = req.body;
        reviewCollection.insertOne(newReview)
            .then(result => {
                console.log('Review added');
            })
    })

    app.get('/getReview', (req, res) => {
        reviewCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

});

// for booking service
client.connect(err => {
    const bookedServiceCollection = client.db("automobile-care").collection("bookService");

    app.post('/bookService', (req, res) => {
        const newBookedService = req.body;
        bookedServiceCollection.insertOne(newBookedService)
            .then(result => {
                console.log('service booked');
            })
    })

    app.get('/bookingList', (req, res) => {
        bookedServiceCollection.find({email: req.query.email})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/orderList', (req, res) => {
        bookedServiceCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.patch('/update/:id', (req, res) => {
        bookedServiceCollection.updateOne({_id: objectId(req.params.id)},
        {
            $set: {status: req.body.status}
        })
        .then(result => {

        })
    })


});


// for admin list
client.connect(err => {
    const adminCollection = client.db("automobile-care").collection("adminList");

    app.post('/makeAdmin', (req, res) => {
        const newAdmin = req.body;
        adminCollection.insertOne(newAdmin)
            .then(result => {
                console.log('admin added');
            })
    })

    app.get('/isAdmin', (req, res) => {
        adminCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

});


// for messages
client.connect(err => {
    const messageCollection = client.db("automobile-care").collection("message");

    app.post('/message', (req, res) => {
        const newMessage = req.body;
        messageCollection.insertOne(newMessage)
            .then(result => {
                console.log('message added');
            })
    })

});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(5000);
