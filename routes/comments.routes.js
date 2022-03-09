const express = require('express');

const {
  getAllComment,
  getCommentById,
  createComment,
  patchComment,
  deleteComment
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', getAllComment);

router.get('/:id', getCommentById)

router.post('/', createComment);

router.patch('/:id', patchComment)

router.delete('/:id', deleteComment)

module.exports = { commentsRouter: router };
