const User = require('../models/user.models');
const { check, validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { 
        pageTitle: 'Login',
        currPage: 'login', 
        isLoggedIn: false,
        errors: [],
        oldInput: {}
    });
};

exports.postLogin = async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({ email: usernameOrEmail });

    if (!user) {
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            currPage: 'login',
            isLoggedIn: false,
            errors: [{ msg: 'Invalid email or password' }],
            oldInput: req.body
        });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            currPage: 'login',
            isLoggedIn: false,
            errors: [{ msg: 'Invalid email or password' }],
            oldInput: req.body
        });
    }

    res.cookie('isLoggedIn', 'true');
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    res.clearCookie('isLoggedIn');
    res.redirect('/login');
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', { 
        pageTitle: 'Sign Up',
        currPage: 'signup', 
        isLoggedIn: false,
        errors: [],
        oldInput: {}
    });
};

exports.postSignup = [
    check('firstName')
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long')
        .matches(/^[A-Za-z]+$/).withMessage('First name must contain only letters'),

    check('lastName')
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .matches(/^[A-Za-z]+$/).withMessage('Last name must contain only letters'),

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character'),

    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    check('userType')
        .notEmpty().withMessage('Please select account type')
        .isIn(['guest', 'host']).withMessage('Invalid account type selected'),

    check('terms')
        .equals('on').withMessage('You must accept the Terms and Conditions'),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).render('auth/signup', {
                pageTitle: 'Sign Up',
                currPage: 'signup',
                isLoggedIn: false,
                errors: errors.array(),
                oldInput: req.body
            });
        }

        try {
            const { firstName, lastName, email, password, userType } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(422).render('auth/signup', {
                    pageTitle: 'Sign Up',
                    currPage: 'signup',
                    isLoggedIn: false,
                    errors: [{ msg: 'Email already exists' }],
                    oldInput: req.body
                });
            }

            const newUser = new User({
                firstName,
                lastName,
                email,
                password,  // will be hashed by mongoose pre-save hook
                userType
            });

            await newUser.save();

            res.redirect('/login');

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
];
