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

function getTweets(page) {
  let pageFixed = page;
  if (pageFixed === 0) {
    pageFixed = 1;
  }
  const arrTweets = [];
  for (let i = tweets.length - 1 - 10 * (pageFixed - 1); i >= 0; i--) {
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
  if (
    !username ||
    username === "" ||
    typeof username !== "string" ||
    !avatar ||
    avatar === "" ||
    typeof avatar !== "string"
  ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  users.push({ username, avatar });
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (users.find((u) => u.username === username) === undefined) {
    return res.status(401).send("UNAUTHORIZED");
  }
  if (
    !username ||
    username === "" ||
    typeof username !== "string" ||
    !tweet ||
    tweet === "" ||
    typeof tweet !== "string"
  ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  tweets.push({ username, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;
  if (page) {
    if (Number(page) <= 1) {
      return res.status(400).send("Informe uma página válida!");
    } else {
      return res.send(getTweets(Number(page)));
    }
  }
  res.send(getTweets(0));
});

app.get("/tweets/:USERNAME", (req, res) => {
  const { USERNAME } = req.params;
  let arrTweetsUser = tweets.filter((t) => t.username === USERNAME);
  arrTweetsUser = arrTweetsUser.reverse();
  arrTweetsUser = arrTweetsUser.map((t) => ({
    username: t.username,
    avatar: getAvatar(t.username),
    tweet: t.tweet,
  }));
  res.send(arrTweetsUser);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
