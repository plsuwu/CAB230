export const mkGET = async (url: string) => {
    const response = await fetch(url);
    console.log(url);


    if (!response.ok) {
        console.log(response.status);
        throw new Error(`HTTP Err: ${response.status}`);
    }

    return response.json();
}
