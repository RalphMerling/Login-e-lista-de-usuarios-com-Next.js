
import "server-only";
import axios from "axios";

const baseURL = process.env.API_BASE_URL;

if (!baseURL) {
    throw new Error("Defina API_BASE_URL no arquivo .env.local.");
}

export const api = axios.create({
    baseURL,
    timeout: 10000,
});
