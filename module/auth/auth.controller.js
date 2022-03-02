const AuthModel = require('./auth.models');
const TokenModel = require('./token.models');
const bcrypt = require('bcrypt');
const tokenProvider = require('../../common/tokenProvider');
const nodemailer = require('nodemailer');
const HttpError = require('../../common/httpErrors');

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const existedUser = await AuthModel.findOne({email})
  if (existedUser) {
    throw new HttpError('existed user', 401)
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await AuthModel.create({
    email: email,
    password: hashPassword,
  });

  const newTokenSave = await TokenModel.create({
    userId: newUser._id,
  })

  res.send({
    success: true,
    data: {
      id: newUser._id,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const existedUser = await AuthModel.findOne({ email });

  if (!existedUser) {
    throw new Error('Incorrect Email');
  }

  const hashPassword = existedUser.password;

  const verifyPassword = bcrypt.compareSync(password, hashPassword);

  if (!verifyPassword) {
    throw new HttpError('Incorrect Password', 401);
  }

  const accessToken = tokenProvider.accessToken(user);
  const refreshToken = tokenProvider.refreshToken(user)


  const existedToken = {

  }

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/', 
    sameSite: 'strict'
  })

  const { password:passwordUser, ...other} = existedUser

  res.send({
    success: true,
    data: {
      ...other,
      accessToken,
      refreshToken
    },
  });
};

module.exports = {
  register,
  login,
};
