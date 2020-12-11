const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);

async function start(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/app-db', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log('Server has been started!');
        });
    } catch(err){
        console.log(err);
    }
}

start();