
import axios from 'axios';

import { ShortUrl } from '../models';

// TODO 
// const endpoint = "http://localhost:8080/api/urls/";
const endpoint = "/api/urls/";

export async function list(): Promise<ShortUrl[]> {
    const response = await axios.get<{ urls: ShortUrl[]}>(endpoint);
    return response.data.urls;
}

export async function shortenUrl(url: string, alias?: string): Promise<ShortUrl>{
    const response = await axios.post<ShortUrl>(endpoint, {url, alias});
    return response.data;
}
