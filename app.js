const express = require('express');
const morgan = require('morgan');
const blogModel = require('./db');
const mongoose = require('mongoose');

//connection string through db user not admin (lazybug)
const dbURI = 'mongodb+srv://blogger:1234@exercise-tracker.k5eslop.mongodb.net/';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(morgan('tiny'));

mongoose.connect(dbURI).then(res => {
    app.listen(3000, () => {
        console.log("Server is running...");
    });
}).catch(err => { console.log(err); });

//page routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/home', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    blogModel.find()
        .then(result => {
            res.render('home', { title: "All Blogs", blogs: result })
            //if res.send document object is returned
        })
        .catch(err => { console.log(err); })
})

// app.get('/add-blog', (req, res) => {
//     const blogEntry = new blogModel({
//         'title': 'Sour Grapes',
//         'body': 'Sour Grapes Sour Grapes Sour Grapes Sour Grapes'
//     });
//     blogEntry.save()
//         .then(result => {
//             res.send(result);
//         }).catch(err => {
//             console.log(err);
//         });
// })

app.get('/create', (req, res) => {
    res.render('create', { title: "Create Blog" });
})

app.use((req, res) => {
    res.status(400).render('404', { title: "No page found" });
})



