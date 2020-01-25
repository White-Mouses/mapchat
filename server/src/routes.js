const { Router } = require('express');
const apiRouter = Router();
import { getPost, getAllPosts, createPost } from "./database/Controllers";

// apiRouter.get('/apple', (req, res) => {
//   console.log('hit')
// });
/*{
  GET to '/messages'
  params: required {location, username || userId}
  params: optional {radius, topics}
  Retruns: a body with an array of all messages in that radius.
    If topics were provided, it will  only return posts with those topics
  }
  */
apiRouter.get('/messages/all', (req, res)=>{
  getAllPosts()
  .then(allPosts=>{
    console.log(x);
    res.send(allPosts);
  })
  .catch(err=>{
    console.log(err)
    res.status(400)
    res.send("error")
  })
})
apiRouter.get('/messages', (req, res)=>{
  console.log(req.body);
  let post = {};
  for (let key in req.body){
    post[key] = req.body[key];
  }
  console.log(post.length);
  getPost(post).then(post=>{
    console.log(post);
    res.send(post)
  })
  .catch(err=>{
    res.status(400)
    console.log(err)
    res.send("error")
  })
})
apiRouter.post('/messages',(req, res)=>{
  const { title, text, post_public, post_local, time_created, updated_at, time_expires, post_anonymous, coordinate } = req.body;
  let post = {
    title,
    text,
    post_public,
    post_local,
    time_created,
    updated_at,
    time_expires,
    post_anonymous,
  };
  createPost(post, coordinate).then(post=>{
    res.send(post);
  })
  .catch(err=>{
    res.status(400)
    console.log(err, 'error')
    res.send("error")
  });

})

//endpoints we will need
//get: messages within x proximity of location

//get: messages within x promixity of location by interests
//get: tweets by location
//get: google places by location
//post: dropmessage at a location
//patch: alter message 
//get: own user profile
//get: other users profiles
//get: users groups
//get: groups members
//get: users friends
//get: users dms/converstaions
//get: messages from a conversation
//post: add a friend request
//get: users interests
//post: post a new user interst
//delete: remove a users interest
//get: a posts comments
//post: add a comment to a post
//post: make group
//post: add new group member
//patch: alter group bio




module.exports.apiRouter = apiRouter;
