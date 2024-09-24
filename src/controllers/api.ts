const doFetch = async (
    endpoint: string,
    method: string,
    token: string,
    jsonBody?: {}
) => {
    try {
        let options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "jwt-token": token
            },
            ...(jsonBody && { body: JSON.stringify(jsonBody) })
        }
        console.log(options);
        const response = await fetch(endpoint, options);
        const result = await response.json();
        return result;
      } catch (e) {
        console.log(e);
    }
}

export const performGet = async (
    endpoint: string,
    token: string
) => {
    return await doFetch(endpoint, "GET", token);
}

export const performPost = async (
    endpoint: string,
    jsonBody: {},
    token: string
) => {
    return await doFetch(endpoint, "POST", token, jsonBody);
}
