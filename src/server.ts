import * as express from 'express'
import 'reflect-metadata';
import { Provider, ReflectiveInjector } from "injection-js";
import { API_TOKEN, SEARCH_QUERY, SEARCH_SERVICE } from "./injection-tokens";
import SearchService from "./search.service";
import HomeController from "./home.controller";

// Get Env variables
const port = process.env.PORT || 3000;
const dirViews = __dirname + '/../views';
const api_token = process.env.GOOGLE_API_TOKEN || 'AIzaSyAouh0wETa-n24yqZ8tAxfJWC39JkOQhO8';

const app = express();

// Register Controllers
app.get('/', (req, res) => {
    res.sendFile('home.html',{ root: dirViews });
});

app.get('/search', (request, response) => {

    const providers = [
        { provide: API_TOKEN, useValue: api_token },
        { provide: SEARCH_QUERY, useValue: request.query },
        { provide: SEARCH_SERVICE, useClass: SearchService },
        HomeController
    ] as Provider[];

    const injector = ReflectiveInjector.resolveAndCreate(providers);
    const controller = injector.get(HomeController);

    controller
        .search()
        .then(res => {
            console.log(res);
            response.send(res);
        }).catch(err => {
            console.error(err);
            response.send(err);
        });



});


// Start server
app.listen(port, () => {
    console.log(`App listening on the http://localhost:${port}`);
});

