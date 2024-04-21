const express = require("express")
const path = require("path")
const app = express()
const priya = require("./mongodb")
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await priya({ name: req.body.name })

    try {
        if (checking && checking.name === req.body.name && checking.password === req.body.password) {
            res.send("User details already exist");
        } else {
            await priya.create(data);
            res.status(201).render("home", {
                naming: req.body.name
            });
        }
    } catch {
        res.send("Raised Error while signup");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await priya.findOne({ name: req.body.name })

        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        } else {
            res.send("Incorrect password")
        }
    } catch (e) {
        res.send("Wrong details")
    }
});

app.listen(port, () => {
    console.log('port connected');
});