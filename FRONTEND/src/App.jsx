import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await axios.post(`${API}/create-post`, formData);

      setCaption("");
      setImage(null);

      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

return (
  <div className="container">
    <div className="header">
      <h1>📸 Image Post</h1>
      <p>Share your moments</p>
    </div>

    <form className="create-post" onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <input
        className="caption-input"
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />

      <button className="post-btn" type="submit">
        Create Post
      </button>
    </form>

    {posts.map((post) => (
      <div className="post-card" key={post._id}>
        <img
          className="post-image"
          src={post.image}
          alt={post.caption}
        />

        <div className="post-content">
          <p className="post-caption">{post.caption}</p>

          <div className="post-footer">
            <button className="action-btn">❤️ Like</button>
            <button className="action-btn">💬 Comment</button>
            <button className="action-btn">🔗 Share</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}

export default App;
