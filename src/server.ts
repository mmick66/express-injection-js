import * as express from 'express'

const port = process.env.PORT || 3000;
const dirViews = __dirname + '/../views';

const app = express();

// Register Controllers
app.get('/', (req, res) => {
    res.sendFile('home.html',{ root: dirViews });
});


// Start server
app.listen(port, () => {
    console.log(`App listening on the http://localhost:${port}`);
});

