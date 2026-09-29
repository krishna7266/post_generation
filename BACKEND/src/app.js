const express = require("express");
const multer = require("multer");
const cors = require("cors");
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://post-generation-1-xeag.onrender.com",
  })
);
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
});

app.get("/", (req, res) => res.send("API is running"));

app.post("/create-post", upload.single("image"), async (req, res) => {
  console.log("content-type:", req.headers["content-type"]);
  console.log("body:", req.body, "| file received:", !!req.file);

  if (!req.file) {
    return res.status(400).json({ message: "A valid image is required" });
  }

  const result = await uploadFile(req.file.buffer);
  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });

  return res.status(201).json({ message: "post created successfully", post });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find().sort({ _id: -1 });
  return res.status(200).json({ message: "posts fetched successfully", posts });
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;
