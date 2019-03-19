const views = require("../config/views.json").views;

module.exports = function(app, passport) {
    for (let i in views) {
        let urls = [];

        if (typeof views[i].url == "string") {
            urls.push(views[i].url);
        } else {
            urls = views[i].url;
        }

        for (let j in urls) {
            app.get(urls[j], function(req, res) {
                res.render(views[i].view);
            });
        }
    }

     app.get("/", function(req, res) {
        let error = req.flash("loginError");
        res.render("index", { loginError: error, registerError: false, login: true, register: false });
    });

    app.get("/login", function(req, res) {
        let error = req.flash("loginError");
        res.render("index", { loginError: error, registerError: false, login: true, register: false });
    });

    app.get("/register", function(req, res) {
        let error = req.flash("registerError");
        res.render("index", { registerError: error, loginError: false, register: true, login: false });
    });

    app.get("*", function(req, res) {
        res.redirect("/");
    });

    app.post("/login", function (req, res, next) {
        passport.authenticate("local-login", {
          successRedirect: "/profile",
          failureRedirect: "/login",
          failureFlash: true,
          badRequestMessage: "Bitte fülle alle Felder aus"
        }, function (error, user, info) {
            console.log(info.message)
            res.render("index", {"loginError": [info.message], registerError: false, login: true, register: false});
        })(req, res, next);
    });

    app.post("/register", function(req, res, next) {
        passport.authenticate("local-register", {
            successRedirect: "/profile",
            failureRedirect: "/register",
            failureFlash: true,
            badRequestMessage: "Bitte fülle alle Felder aus"
        }, function (error, user, info){
            res.render("index", {"loginError": false, registerError: [info.message], login: false, register: true});
        })(req, res, next);
    });
}
