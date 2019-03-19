/*

* * * * * * * * * * * * * * 
*                         *
*   #     #   # # # #     *
*   #     #         #     *
*   # # # #       #       *
*   #     #     #         *
*   #     #    # # # #    *
*                    CMS  *                 
* * * * * * * * * * * * * *
Powered by hzCMS 
Website: https://habbo.zone

Created by Habbo.Zone Development Team
HolyFuture (Coding) 
and Leonidas (Webdesign)
Discord: https://discord.gg/3HZfVkm
*/

const express       = require("express");
const app           = express();
const server        = require("http").Server(app);
const io            = require("socket.io")(server);
const passport      = require("passport");
const cookieParser  = require("cookie-parser");
const session       = require('express-session');
const flash         = require('connect-flash');
const db            = require("./modules/sequelize");

/*
    app setup
*/

var reCAPTCHA = require('recaptcha2');

var recaptcha = new reCAPTCHA({
  siteKey: '6LdogZcUAAAAALisvE4vlU24stDg0TagQh7U6s-q',
  secretKey: '6LdogZcUAAAAAPc_OLo9CctOQtQTE1V-qg5tPyd-'
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/assets", express.static("assets"));
app.use(cookieParser());

app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({ extended: true }));

/*
    passport
*/

require("./modules/passport")(passport, db);


/*
    routes
*/

require("./modules/router")(app, passport);


/*
    socket setup
*/

io.on("connection", function(socket) {
    // console.log("New connection");
});

server.listen(80);
