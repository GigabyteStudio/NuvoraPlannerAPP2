const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

const PORT = 8080;

// Login temporário de desenvolvimento
const DEV_EMAIL = "gigabytestudio.dev@gmail.com";
const DEV_PASSWORD = "12345678";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "nuvora-development-secret",
        resave: false,
        saveUninitialized: false
    })
);

// FUNÇÕES

function requireAuth(req, res, next) {

    if (!req.session.user) {
        return res.redirect("/");
    }

    next();
}

// ROTA LOGIN
app.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/dashboard");
    }

    res.render("login", {
        error: null
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", {
            error: "Preencha todos os campos."
        });
    }

    if (email !== DEV_EMAIL || password !== DEV_PASSWORD) {
        return res.render("login", {
            error: "E-mail ou senha incorretos."
        });
    }

    req.session.user = {
        email: DEV_EMAIL
    };

    res.redirect("/dashboard");
});

// ROTA DASHBOARD
app.get("/dashboard", requireAuth, (req, res) => {

    res.render("dashboard", {
        user: req.session.user
    });

});

// ROTA LOGOUT
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Nuvora Planner iniciado em http://localhost:${PORT}`);
});

// ROTA BALANÇO

app.get("/balanco", requireAuth, (req, res) => {

    res.render("balanco", {
        user: req.session.user
    });

});

// ROTA METAS

app.get("/metas", requireAuth, (req, res) => {

    res.render("metas", {
        user: req.session.user
    });

});

// ROTA INVESTIMENTOS

app.get("/investimentos", requireAuth, (req, res) => {

    res.render("investimentos", {
        user: req.session.user
    });

});

// ROTA PLANEJAMENTO

app.get("/planejamento", requireAuth, (req, res) => {

    res.render("planejamento", {
        user: req.session.user
    });

});

// ROTA LANCAMENTOS

app.get("/lancamentos", requireAuth, (req, res) => {

    res.render("lancamentos", {
        user: req.session.user
    });

});

// ROTA ANALISES

app.get("/analises", requireAuth, (req, res) => {

    res.render("analises", {
        user: req.session.user
    });

});

// ROTA PENDENCIAS

app.get("/pendencias", requireAuth, (req, res) => {

    res.render("pendencias", {
        user: req.session.user
    });

});

// ROTA PLANOS

app.get("/planos", requireAuth, (req, res) => {

    res.render("planos", {
        user: req.session.user
    });

});