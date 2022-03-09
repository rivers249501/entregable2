const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObject');

exports.getAllPost = catchAsync(async (req, res, next) => {
  
    const post = await Post.findAll({
      Where: {status: 'active'},
      include: [{
          model: User,
        include: [{
            model: Comment
        }]
    }]
    });

    if(!post){
      return next(new AppError(404, 'post not found'))
    }
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  
});

exports.getPostById = catchAsync(async (req, res, next) => {
    
        const { id } = req.params

        const post = await Post.findOne({
             
            where: { id: id, status: 'active'},
            include: [{model: User,
            include: [{
                model: Comment
            }]}]
        });

        if(!post){
          return next(new AppError(404, 'post not found'))
        }

        res.status(201).json({
            status: 'success',
            data: {
              post
            }
          });        
    
})

exports.createPost = catchAsync(async (req, res, next) => {

  const { title, content, userId, imgUrl } = req.body;

    if(!title || !content || !userId || !imgUrl){
      return next( new AppError( 404, 'post not found'))
    }

    const newPost = await Post.create({
      title: title,
      content: content,
      userId: userId,
      imgUrl: imgUrl
    });

    res.status(201).json({
      status: 'success',
      data: {
        newPost
      }
    });
})

exports.patchPost = catchAsync(async (req, res, next) => {

  const {id} = req.params
    const data = filterObj(req.body, 'title', 'content', 'userId', 'imgUr')
    

    const post = await Post.findOne({
      where: {id: id, status: 'active'},
      include: [{model: User,
            include: [{
                model: Comment
            }]}]
        })

      if(!post){
        return next( new AppError(404, 'cant update post invalid'))
        }
        await post.update({ ...data})
        res.status(204).json({ status: 'success'})
 
})

exports.deletePost  = catchAsync(async (req, res) => {

  const { id } = req.params

  const post = await Post.findOne({
    where: {id:id, status: 'active'}
  })

  if(!post){
    return next( new AppError(404, 'cant delete post, invalid id')) 
  }
  
  await post.update({status: 'deleted'})
  res.status(204).json({ status: 'success'})
})
