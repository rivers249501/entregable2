
const { Comment } = require('../models/comment.model');
// const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
// const { filterObj } = require('../util/filterObject');

exports.getAllComment = async (req, res) => {
  try {
    const comment = await Comment.findAll({
      where: { status: 'active' },
      include: [{
          model: User
      }]
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCommentById = async(req, res) => {
  try {
    const {id} = req.params
    const comment = await Comment.findOne({
      where: {id: id, status: 'active' },
      include: [{model: User}]
    })
    if (!comment){
      res.status(404).json({
        status: 'error',
        message: 'Not found Id'
      })
      return

    }
    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    })
    
  } catch (error) {
    console.log(error)
  }
}

exports.createComment = async (req, res) => {
  try {
    const { description, userId, postId } = req.body;

    const newComment = await Comment.create({
      description: description,
      userId: userId,
      postId: postId
    });

    res.status(201).json({
      status: 'success',
      data: {
        newComment
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.patchComment = async ( req, res ) => {
  try {
    const { id } = req.params
    //Con el filter object de la linea de abajo funciona, 79 y 94 comentados, pero con con la 80 y 95 no
    //const data = filterObj(req.body, 'description', 'userId', 'postId')
    const { description } = req.body

    const comment = await Comment.findOne({
      where: {id: id, status: 'active'},
    })

    if(!comment){
      res.status(404).json({
        status: 'error',
        message: 'Cant update comment, please verify'
      })
      return
    }

    //await comment.update({ ...data})
    await comment.update({description})
    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    })

  } catch (error) {
    console.log(error);
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await Comment.findOne({
      where: {id: id, status: 'active'}
    })

    if(!comment){
      res.status(404).json({
        status: 'error',
        message: 'Not found id, please verify'
      })
    }

    await comment.update({status: 'delete'})

    res.status(201).json({
      status: 'sucess'
    })



  } catch (error) {
    console.log(error)
  }
}


