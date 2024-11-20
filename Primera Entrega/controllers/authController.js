const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/bcryptHelper');

exports.register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
        });
        res.status(201).send({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !comparePassword(password, user.password)) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true }).send({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.current = (req, res) => {
    res.send(req.user);
};
