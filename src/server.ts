import * as express from 'express'
import 'reflect-metadata';
import { Provider, ReflectiveInjector } from "injection-js";
import { API_TOKEN, SEARCH_QUERY, SEARCH_SERVICE } from "./injection-tokens";
import SearchService from "./search.service";
import HomeController from "./home.controller";

const port = process.env.PORT || 3000;
const dirViews = __dirname + '/../views';

const app = express();

// Register Controllers
app.get('/', (req, res) => {
    res.sendFile('home.html',{ root: dirViews });
});

app.get('/search', (req, res) => {

    const providers = [
        { provide: API_TOKEN, useValue: 'AIzaSyAouh0wETa-n24yqZ8tAxfJWC39JkOQhO8' },
        { provide: SEARCH_QUERY, useValue: req.query },
        { provide: SEARCH_SERVICE, useClass: SearchService },
        HomeController
    ] as Provider[];

    const injector = ReflectiveInjector.resolveAndCreate(providers);
    const controller = injector.get(HomeController);

    controller
        .search()
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });


});


// Start server
app.listen(port, () => {
    console.log(`App listening on the http://localhost:${port}`);
});

