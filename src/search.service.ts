import { Inject, Injectable } from "injection-js";
import { API_TOKEN } from "./injection-tokens";
import * as request from "request";

@Injectable()
class SearchService {

    constructor(
        @Inject(API_TOKEN) private api_token) {
    }

    search(term: string): Promise<string> {

        return new Promise((resolve, reject) => {

            let path = 'https://www.googleapis.com/customsearch/v1?' + [
                'key=' + this.api_token,
                'cx=' + '012115184303051364517:mmed9fntw3s',
                'q=' + term
            ].join('&');

            request({ url: path, json: true }, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                resolve(body.items);
            });
        });
    }

}

export default SearchService;
