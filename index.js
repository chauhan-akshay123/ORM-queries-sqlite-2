const express = require("express");
const app = express();
const cors = require("cors");
let { post } = require("./models/post.model");
let { sequelize } = require("./lib/index");

app.use(express.json());
app.use(cors());

let postData = [
    {
      title: 'Getting Started with Node.js',
      content:
        'This post will guide you through the basics of Node.js and how to set up a Node.js project.',
      author: 'Alice Smith',
    },
    {
      title: 'Advanced Express.js Techniques',
      content:
        'Learn advanced techniques and best practices for building applications with Express.js.',
      author: 'Bob Johnson',
    },
    {
      title: 'ORM with Sequelize',
      content:
        'An introduction to using Sequelize as an ORM for Node.js applications.',
      author: 'Charlie Brown',
    },
    {
      title: 'Boost Your JavaScript Skills',
      content:
        'A collection of useful tips and tricks to improve your JavaScript programming.',
      author: 'Dana White',
    },
    {
      title: 'Designing RESTful Services',
      content: 'Guidelines and best practices for designing RESTful APIs.',
      author: 'Evan Davis',
    },
    {
      title: 'Mastering Asynchronous JavaScript',
      content:
        'Understand the concepts and patterns for writing asynchronous code in JavaScript.',
      author: 'Fiona Green',
    },
    {
      title: 'Modern Front-end Technologies',
      content:
        'Explore the latest tools and frameworks for front-end development.',
      author: 'George King',
    },
    {
      title: 'Advanced CSS Layouts',
      content:
        'Learn how to create complex layouts using CSS Grid and Flexbox.',
      author: 'Hannah Lewis',
    },
    {
      title: 'Getting Started with React',
      content: "A beginner's guide to building user interfaces with React.",
      author: 'Ian Clark',
    },
    {
      title: 'Writing Testable JavaScript Code',
      content:
        'An introduction to unit testing and test-driven development in JavaScript.',
      author: 'Jane Miller',
    },
  ];

// Defining a route to seed the database
app.get("/seed_db", async (req, res) => {
  try{
   await sequelize.sync({ force: true });

   await post.bulkCreate(postData);
   
   res.status(200).json({ message: "Database seeding successful." });
  } catch(error){
    res.status(500).json({ message: "Error seeding the database", error: error.message });
  }
});

// function to fetch all Posts
async function fetchAllPosts(){
	let posts = await post.findAll();
	return { posts };
}

// Endpoint to fetch all the posts
app.get("/posts", async (req, res) => {
 try{
  let response = await fetchAllPosts();

	if(response.posts.length === 0){
		return res.status(404).json({ message: "No posts found." });
	}

	return res.status(200).json(response); 
 } catch(error){
	 res.status(500).json({ message: "Error fetching the posts", error: error.message });
 }
});

// function to fetch post by Id
async function fetchPostById(id){
	let postData = await post.findOne({ where: {id} });
	return { post: postData };
}

// Endpoint to fetch post details by Id
app.get("/posts/details/:id", async (req, res) => {
 try{
	 let id = parseInt(req.params.id);
	 let result = await fetchPostById(id);

	 if(result.post === null){
		 return res.status(404).json({ error: "Post not found." });
	 }
   
	 return res.status(200).json(result);
 } catch(error){
	 res.status(500).json({ message: "Error fetching the posts by Id", error: error.message });
 }
});

// function to fetch all posts by author
async function fetchPostByAuthor(author){
	let posts = await post.findAll({ where: { author } });
	return { posts: posts };
}

// Endpoint to fetch all posts by an author
app.get("/posts/author/:author", async (req, res) => {
 try{
	 let author = req.params.author
	 let result = await fetchPostByAuthor(author);

	 if(result.posts.length === 0){
		 return res.status(404).json({ message: "Posts not found." });
	 }

   return res.status(200).json(result);
 } catch(error){
	 res.status(500).json({ message: "Error fetching post by author", error: error.message });
 }
});

// function to sort all posts by their names
async function sortPostByName(order){
	let sortedPosts = await post.findAll({order: [["name", order]]}); 
	return { posts: sortedPosts };
}

// Endpoint to sort all posts by their names
app.get("/posts/sort/name", async (req, res) => {
 try{
	 let order = req.query.order;
   let result = await sortPostByName(order);

	 if(result.posts.length === 0){
		 return res.status(404).json({ message: "No post found." });
	 }
   
   return res.status(200).json(result);
 } catch(error){
	 res.status(500).json({ message: "Error sorting the posts", error: error.message });
 }
});

// function to add a new popst in the database
async function addNewPost(postData){
    let newPost = await post.create(postData);

    return { newPost };
}

// Endpoint to add a new post in the database
app.post("/posts/new", async (req, res) => {
 try{
    let newPost = req.body.newPost;
    let response = await addNewPost(newPost);
    return res.status(200).json(response);
 } catch(error){
    res.status(500).json({ message: "Error adding new post", error: error.message });
 }
});

// function to update post information
async function updatePostById(updatePostData ,id){
  let postDetails = await post.findOne({ where: { id } });
  if(!postDetails){
    return {};
  }

  postDetails.set(updatePostData);
  let updatedPost = await postDetails.save();

  return { message: "Track updated successfully.", updatedPost };
}

// Endpoint to update post information
app.post("/posts/update/:id", async (req, res) => {
 try{
   let newPostData = req.body;
   let id = parseInt(req.params.id);
   let response = await updatePostById(newPostData, id);

   if(!response.message){
    return res.status(404).json({ message: "Post not found." });
   }
   
   return res.status(200).json(response);
 } catch(error){
    res.status(500).json({ message: "Error updating the post", error: error.message });
 }
});

// function to delete post from the database
async function deletePostById(id){
   let destroyedPost = await post.destroy({ where: { id } });
   
   if(destroyedPost === 0){
    return {};
   }
   
   return { message: "Post has been deleted successfully." };
}

// Endpoint to delete post from the database
app.post("/posts/delete", async (req, res) => {
 try{
  let id = parseInt(req.body.id);
  let response = await deletePostById(id);

  if(!response.message){
    return res.status(404).json({ message: "Post not found." });
  }
  
  return res.status(200).json(response);
 } catch(error){
    res.status(500).json({ message: "Error deleting the post", error: error.message });
 }
});

app.listen(3000, () => {
 console.log("Server is running on Port : 3000");
});
