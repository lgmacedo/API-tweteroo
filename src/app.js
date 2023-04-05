import express from "express";
import cors from "cors";

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
  },
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "Eu amo hambúrguer de siri!",
  },
];

function getAvatar(username){
    for(let i=0; i<users.length; i++){
        if (users[i].username === username){
            return users[i].avatar;
        }
    }
    return null;
}

const app = express();
app.use(cors());

app.get("/tweets", (req, res) => {
  res.send(
    tweets.map((t) => ({
      username: t.username,
      avatar:
        getAvatar(t.username),
      tweet: t.tweet,
    }))
  );
});

app.listen(5000, () => console.log("Running server on port 5000"));
