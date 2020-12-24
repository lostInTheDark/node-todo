const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/router');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'codeworksecret',
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next)=>{
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
});

app.use(todoRoutes);

app.use((req, res, next)=>{
    res.render('not_found');
});

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