const { User, Post } = require('../../model');
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
    getById,
    updatePost,
    addPost,
    deletePost,
    getAllPostByUserId
};

async function addPost(userId, postAddDto) {
    console.log(userId);
    const post = new Post({ ...postAddDto, userId });
    return await post.save();
}

async function getById(postId) {
    return await Post.findById(postId);
}

async function getAllPostByUserId(userId) {
    return await Post.find({ userId: new ObjectId(userId) });
}
async function updatePost(postId, postUpdateDto) {
    const postDetail = await Post.findById(postId);

    // validate
    if (!postDetail) throw 'Post not found';
    Object.assign(postDetail, postUpdateDto);

    return await postDetail.save();
}

async function deletePost(postId) {
    return await Post.findByIdAndRemove(postId);
}