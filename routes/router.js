const { hash } = require('bcryptjs');
const {Router} = require('express');
const router = Router();
const joi = require('joi');
const passport = require('passport');

const Todo = require('../models/Todo');
const User = require('../models/User');

const userSchema = joi.object().keys({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    password_confirm: joi.any().valid(joi.ref('password')).required()
});

router.get('/', async (req, res)=>{

    const todos = await Todo.find({}).lean();

    res.render('index', {
        title: "Todos", 
        isIndex: true,
        todos
    });
});

router.get('/signup', (req, res) =>{
    res.render('signup');
});

router.post('/signup', async(req, res, next)=>{
    try{
        const result = userSchema.validate(req.body);
        if(result.error){
            req.flash('error', 'Data entered is not valid! Please try again!');
            res.redirect('/signup');
            return;
        }

        const user = await User.findOne({'email': result.value.email}).exec();
        if(user){
            req.flash('error', 'Email is already in use!');
            res.redirect('/signup');
            return;
        }
        const hash = await User.hashPassword(result.value.password);
        
        delete result.value.password_confirm;
        result.value.password = hash;

        const newUser = await new User(result.value);
        await newUser.save();

        req.flash('success', 'Registration successfuly, go ahead and login.');
        res.redirect('/');
    } catch(err){
        next(err);
    }
});

router.get('/create', (req, res)=>{
    res.render('create', {
        title: "Create todo",
        isCreate: true
    });
});

router.post('/create', async (req, res) =>{
    const todo = new Todo({
        title: req.body.title
    });

    await todo.save();
    res.redirect('/');
});

router.post('/complete', async (req, res) =>{
    const todo = await Todo.findById(req.body.id);

    todo.completed = !!req.body.completed;
    await todo.save();
    res.redirect('/');
});

module.exports = router;