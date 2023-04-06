import express from "express";
import cors from "cors";

const users = [];

const tweets = [];

function getAvatar(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return users[i].avatar;
    }
  }
  return null;
}

function get10LastTweets(tweets) {
  const arrTweets = [];
  for (let i = tweets.length - 1; i >= 0; i--) {
    arrTweets.push({
      username: tweets[i].username,
      avatar: getAvatar(tweets[i].username),
      tweet: tweets[i].tweet,
    });
    if (arrTweets.length === 10) break;
  }
  return arrTweets;
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  users.push({ username, avatar });
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (users.find((u) => u.username === username) === undefined) {
    return res.send("UNAUTHORIZED");
  }
  tweets.push({ username, tweet });
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  res.send(get10LastTweets(tweets));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
