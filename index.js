import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        posts: posts,
    });
});

app.post("/create-post", (req, res) => {
    const postTitle = req.body.title;
    const postContent = req.body.content;

    const newPost = {
        id: Date.now(),
        title: postTitle,
        content: postContent,
    };

    posts.push(newPost);

    res.redirect("/");
});

app.get("/post/:id", (req, res) => {
    const postID = req.params.id;
    const post = posts.find(p => p.id == postID);

    if (post) {
        res.render("post", {
            title: post.title,
            content: post.content,
        });
    }
    else {
        res.status(404).send("Post Not Found!");
    }
});

app.get("/edit-post/:id", (req, res) => {
    const postID = req.params.id;
    const post = posts.find(p => p.id == postID);

    if (post) {
        res.render("edit", {
            title: post.title,
            content: post.content,
            id: post.id
        });
    }
    else {
        res.status(404).send("Post Not Found!");
    }
});

app.post("/edit-post/:id", (req, res) => {
    const postID = req.params.id;
    const post = posts.find(p => p.id == postID);

    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        res.redirect("/");
    }
    else {
        res.status(404).send("Post Not Found!");
    }
});

app.post("/delete-post/:id", (req, res) => {
    const postID = req.params.id;
    posts = posts.filter(post => post.id != postID);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});