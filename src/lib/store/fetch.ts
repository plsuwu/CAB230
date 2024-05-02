import { apiUrl } from "@/lib/index";

export const fetchFromApi = async (endpoint: string) => {
    const url = `${apiUrl}${endpoint}`;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (err) {

        console.log('ERR =>', err);
    }
}
