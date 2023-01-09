const express = require('express');
const router = express.Router();
const { addPost, deletePost, getAllPostByUserId, getById, updatePost } = require('../service/users/post.service');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/jwt');
const postBodySchema = [
  check('title', "Post title is mandatory").not().isEmpty().isLength({ min: 3 }),
  check('description', 'Post description is mandator').not().isEmpty().isLength({ min: 15 }),
]

// routes
router.post('/', auth, postBodySchema, addPostService);
router.get('/', auth, getPostService);
router.put('/:id', auth, postBodySchema, updatePostService);
router.get('/:id', auth, postDetailService);
router.delete('/:id', auth, deletePostService);

module.exports = router;

function addPostService(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }
  addPost(req.auth.id, req.body)
    .then((post) => {
      res.json({
        data: post,
        message: "Post added successfully"
      }).status(200);
    })
    .catch(err => next(err));
}

function getPostService(req, res, next) {
  getAllPostByUserId(req.auth.id)
    .then((post) => {
      console.log(post);
      if (post?.length) {
        return res.json({
          data: post,
          message: "Post list fetched successfully"
        }).status(200);
      }
      return res.json({
        data: null,
        message: "No post found"
      }).status(400);
    })
    .catch(err => next(err));
}

function postDetailService(req, res, next) {
  getById(req.params.id)
    .then((post) => {
      if (post) {
        return res.json({
          data: post,
          message: "Post detail fetch successfully"
        }).status(200);
      }
      return res.json({
        data: null,
        message: "No post found"
      }).status(400);
    })
    .catch(err => next(err));
}

function deletePostService(req, res, next) {
  console.log(req.params.id,"check delete api");
  deletePost(req.params.id)
    .then((post) => {
      if (post) {
        return res.json({
          data: post,
          message: "Post deleted successfully"
        }).status(200);
      }
      res.json({
        data: null,
        message: "No post found"
      }).status(400);
    })
    .catch(err => next(err));
}

function updatePostService(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  } else {
    updatePost(req.params.id, req.body)
      .then((post) => {
        if (post?.length) {
          return res.json({
            data: post,
            message: "Post added successfully"
          }).status(200);
        }
        return res.json({
          data: null,
          message: "Post update failed, Please try again."
        }).status(400);
      })
      .catch(err => next(err));
  }
}
