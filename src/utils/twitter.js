var { Client, auth } = require("twitter-api-sdk");
var express = require("express");

var {createHash} = require("crypto");

// create sha-256 hash of twitter username
const addressFromUsername = (username) => {
    let full_hash = createHash('sha256').update(username).digest('hex');
    return "0x" + full_hash.substring(full_hash.length - 40, full_hash.length)
}

const app = express();

const clientId = 'dzg0M2pNTnU2YWNIVURHOHpZdVo6MTpjaQ';
const clientSecret = 'CaciZdN3J-44T1IfUc7dY1F7k8nYpUjrqk1BmbiM_OLLOjxgMm';

const authClient = new auth.OAuth2User({
  client_id: clientId,
  client_secret: clientSecret,
  callback: "http://localhost:8000/callback",
  scopes: ["tweet.read", "users.read"],
});

const client = new Client(authClient);

const STATE = "my-state";

app.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");

    await authClient.requestAccessToken(code);
    const getCurrentUser = (await client.users.findMyUser()).data.username;

    const address = addressFromUsername(getCurrentUser);
    res.redirect('http://localhost:3000/?username=' + getCurrentUser + '&address=' + address);
  } catch (error) {
    console.log("the error is ", error);
    res.send(error);
  }
});

app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  res.redirect(authUrl);
});

app.get("/revoke", async function (req, res) {
  try {
    const response = await authClient.revokeAccessToken();
    res.redirect('http://localhost:3000/');
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log(`Go here to login: http://127.0.0.1:8000/login`);
});