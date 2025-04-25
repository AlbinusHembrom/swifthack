const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/client', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
  
})

app.post('/', (req, res) => {
  const s = req.body;
  console.log(s);
  if ((s['email'] == "adm@cab.in") && (s['password'] == "1234")){
    res.cookie('allow_recepient', 'T', { maxAge: 900000, httpOnly: false, secure: false, sameSite: 'lax'});
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}
  else if ((s['email'] == "usr@cab.in") && (s['password'] == "1234")){
    res.cookie('allow_recepient', 'T', { maxAge: 900000, httpOnly: false, secure: false, sameSite: 'lax'});
    res.redirect("/client")
  } else {
    res.redirect("/signin")
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
