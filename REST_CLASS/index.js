const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Upload folder
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// Mock user
let user = {
    username: "john_doe",
    dp: "/uploads/default_dp.png", // initial default DP
    followers: 0,
    following: 0
};

// Posts
let posts = [
    { id: uuidv4(), username: user.username, content: "Hello Instagram!", photo: "/uploads/sample1.jpg" }
];

// Routes

// Home feed / Profile
app.get('/', (req, res) => {
    res.render('index', { user, posts });
});

// Profile DP update
app.post('/profile/dp', upload.single('dp'), (req, res) => {
    if(req.file) user.dp = `/uploads/${req.file.filename}`;
    res.redirect('/');
});

// Create new post
app.get('/posts/new', (req, res) => res.render('new'));
app.post('/posts', upload.single('photo'), (req, res) => {
    const { content } = req.body;
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;
    posts.unshift({ id: uuidv4(), username: user.username, content, photo: photoPath });
    res.redirect('/');
});

// Edit post
app.get('/posts/:id/edit', (req,res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit', { post });
});
app.patch('/posts/:id', upload.single('photo'), (req,res) => {
    const post = posts.find(p => p.id === req.params.id);
    post.content = req.body.content;
    if(req.file) post.photo = `/uploads/${req.file.filename}`;
    res.redirect('/');
});

// Delete post
app.delete('/posts/:id', (req,res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});
y5h
// Follow/Unfollow (simple toggle)
app.post('/follow', (req,res) => {
    if(req.body.action === "follow") user.followers++;
    else if(req.body.action === "unfollow") user.followers--;
    res.redirect('/');
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
