const express = require("express");
const app = express();
const cors = require("cors");
let { post } = require("./models/post.model");
let { sequelize } = require("./lib/index");

app.use(express.json());
app.use(cors());

let postData = [
	{
	  id: 1,
	  name: 'Post1',
	  author: 'Author1',
	  content: 'This is the content of post 1',
	  title: 'Title1'
	},
	{
    id: 2,
    name: 'Post2',
    author: 'Author2',
    content: 'This is the content of post 2',
    title: 'Title2'
	},
	{
	  id: 3,
	  name: 'Post3',
	  author: 'Author1',
	  content: 'This is the content of post 3',
	  title: 'Title3'
	}
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

app.listen(3000, () => {
 console.log("Server is running on Port : 3000");
});