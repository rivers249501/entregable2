const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

//Init bcryptjs
const bcryptjs = require('bcryptjs');

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      Where: {status: 'active'},
      include: [
        {
        model: Post,
        include: [{
          model: Comment
        }]
      }
    ]
    });
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    let passwordHash = await bcryptjs.hash(password, 8)

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: passwordHash
    })

    res.status(201).json({
      status: 'success',
      message: 'The new User was created succesfully'
    })

  } catch (error) {
    console.log(error); 
  }
}

//exports.viewUser = async (req, res) => {
//  try {
//    const { userName, password } = req.body
//    const userLog = await User.afterValidate({
//      userName: userName,
//    })
//    res.status(201).json({
//      status: 'success',
//      message: "Welcome to userName "
//    })
//  } catch (error) {
//    console.log(error)
//  }
//}