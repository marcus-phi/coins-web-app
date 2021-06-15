export const handleResponse = response => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}

export const displayLocaleNumber = value => {
    return value == null ? "" : value.toLocaleString('en');
}