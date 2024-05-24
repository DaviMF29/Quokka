import axios from "axios";

export const api = axios.create({
    // baseURL: 'https://quokka-y7pr.onrender.com'
    baseURL: 'http://127.0.0.1:5000'
})