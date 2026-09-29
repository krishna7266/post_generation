# Image Post App

A small full-stack app where you can upload a picture, write a caption, and see all the posts you've made so far. The frontend is React, the backend is Node and Express, post data lives in MongoDB, and the images themselves are stored on ImageKit.

## What it does

You pick an image, type a caption, and hit post. The image goes to ImageKit, the resulting URL and your caption get saved in MongoDB, and the feed updates with your new post. The layout is responsive, so it works fine on a phone too.

## Built with

- **Frontend:** React, Vite, Axios, plain CSS
- **Backend:** Node.js, Express, Multer (for handling uploads), CORS
- **Database:** MongoDB with Mongoose
- **Image storage:** ImageKit

## Project structure

```text
PROJECT_1/
├── BACKEND/
│   ├── src/
│   │   ├── app.js
│   │   ├── db/db.js
│   │   ├── models/post.model.js
│   │   └── services/storage.service.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── FRONTEND/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## How a post gets created

```text
React frontend  ──(Axios)──►  Express backend
                                  │
                      ┌───────────┴───────────┐
                      ▼                       ▼
                  ImageKit                MongoDB
              (returns image URL)     (stores URL + caption)
```

1. You choose an image and write a caption in the React app.
2. React packs both into a `FormData` object and sends it to the backend with Axios.
3. Multer picks up the file on the Express side.
4. The backend uploads the image to ImageKit and gets back a URL.
5. That URL and the caption are saved as a new document in MongoDB.
6. The backend sends the created post back, and React fetches and shows the updated list of posts.

## Running it locally

**1. Clone the repo**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd PROJECT_1
```

**2. Set up the backend**

```bash
cd BACKEND
npm install
```

Create a `.env` file inside `BACKEND` with your own credentials:

```env
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Please don't commit this file. It contains secrets, which is why the repo only ships a `.env.example`.

Then start the server:

```bash
node server.js
```

It runs at `http://localhost:3001`.

**3. Set up the frontend**

In a second terminal:

```bash
cd FRONTEND
npm install
npm run dev
```

Vite will print the local URL, which is usually `http://localhost:5173`.

## API

| Method | Endpoint       | What it does                                              |
| ------ | -------------- | --------------------------------------------------------- |
| POST   | `/create-post` | Creates a post. Send `image` (file) and `caption` (text). |
| GET    | `/posts`       | Returns all posts stored in MongoDB.                      |

## Environment variables

| Variable               | Purpose                   |
| ---------------------- | ------------------------- |
| `MONGO_URI`            | MongoDB connection string |
| `IMAGEKIT_PRIVATE_KEY` | Your ImageKit private key |

## Things I'd like to add

- User authentication
- Likes and comments
- Editing and deleting posts
- Image validation and file size limits
- Better error handling and loading states
- Deploying the frontend and backend
- Configuring the API URL per environment instead of hardcoding it

## Author

Built by **Krishna Ranjan Singh**, IIT Kanpur.
