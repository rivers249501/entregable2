const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');
const { AppError} = require('../util/AppError');
const { catchAsync} =require('../util/catchAsync');

//Init bcryptjs
const bcryptjs = require('bcryptjs');

exports.getAllUser = catchAsync(async (req, res, next) => {
  
    const user = await User.findAll({
      Where: {status: 'active'},
      include: [
        {
        model: Post,
        include: [{
          model: Comment
        }]
      }
      // {model: Comment, include: [{model: Post}]}
    ]
    });
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id: id, status: 'active' },
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment
          }
        ]
      }
      // { model: Comment, include: [{ model: Post }] }
    ]
  });

  if(!user){
    return next(new AppError(404, 'user not found'))
  }

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
  });


exports.createUser = catchAsync(async (req, res) => {
  
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return next(
        new AppError(400, 'Must provide a valid name, email and password')
      );
    }

    let passwordHash = await bcryptjs.hash(password, 8)

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: passwordHash
    })

    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    })

  
})
