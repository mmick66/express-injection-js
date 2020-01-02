import SearchService from "./search.service";
import { Inject, Injectable } from "injection-js";
import { SEARCH_QUERY, SEARCH_SERVICE } from "./injection-tokens";

@Injectable()
class HomeController {
    constructor(
        @Inject(SEARCH_SERVICE) private service: SearchService,
        @Inject(SEARCH_QUERY) private query) {
    }

    search(): Promise<string> {
        const term = this.query['term'] || '';
        return this.service.search(term)
    }
}

export default HomeController;
