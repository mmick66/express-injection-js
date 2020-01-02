import { InjectionToken } from "injection-js";
import SearchService from "./search.service";

export const SEARCH_QUERY = new InjectionToken<any>('SEARCH_QUERY');
export const API_TOKEN = new InjectionToken<any>('API_TOKEN');
export const SEARCH_SERVICE = new InjectionToken<SearchService>('API_TOKEN');
