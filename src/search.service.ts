import { Inject, Injectable } from "injection-js";
import { API_TOKEN, SEARCH_QUERY } from "./injection-tokens";
import * as http from 'http';

@Injectable()
class SearchService {

    constructor(
        @Inject(API_TOKEN) private api_token) {
    }

    search(term: string): Promise<string> {

        return new Promise((resolve, reject) => {

            let data = '';

            const options = {
                host: 'https://www.googleapis.com',
                path: 'customsearch/v1?key=' + this.api_token + '&q=' + term,
                method: 'GET',
            };

            const req = http.get(options, (res) => {
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', error => {
                reject(error);
            });
        });
    }

}

export default SearchService;
