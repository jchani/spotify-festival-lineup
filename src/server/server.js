const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 8080;

const client_id = '569b69dd5ce3475887487257eeca0cbc'; // Your client id
const client_secret = '7a44e066e64e405a86dda37818b1ca53'; // Your secret
const redirect_uri = 'http://localhost:8080/callback'; // Your redirect uri
const publicPath = path.join(__dirname, '..','..','public');

const app = express();
app.use(express.static(publicPath))
   .use(cors())
   .use(cookieParser());

app.get('/', function(req, res) {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  //Exchange auth code, client id and secret for access token in post request
  request.post(authOptions, (error, response, body) => {
    const accessToken = body.access_token;
    const refreshToken = body.refresh_token;
    const maxAge = body.expires_in;
    const expiration = new Date(Number(new Date()) + (maxAge * 1000));

    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    };

    res.cookie('token', accessToken, { expires: expiration, httpOnly: false});
    res.cookie('refresh', refreshToken);
    //TODO: store in cookie when we merge servers
    //res.cookie('name', getName(accessToken));
    res.redirect('/');
  });
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    res.cookie('token', accessToken, { 'expire': expiration, httpOnly: false});
    res.send({
      'access_token': access_token
    });
  });
});

app.listen(port, () => {
  console.log('Server is up!');
});
