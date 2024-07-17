const bcrypt = require('bcryptjs');
const prisma = require('../models/prismaClient');
const generateToken = require('../utils/generateToken');

// Admin creating a new user
const createUser = async (req, res) => {
  const { email, password, mobile, name, station, role } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      mobile,
      name,
      station,
      role,
    },
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { createUser, loginUser };
