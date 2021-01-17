import config from './config';

function fetchApi(url: string, setup: object): Promise<any> {

    let fetchError = false;
    return (fetch(url, setup)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            if (response.status === 401) {
                localStorage.removeItem('user_token');
                window.location.href = '/auth/login';
            }

            fetchError = true;
            return response.json();
        })
        .then((data: any) => {
            if (fetchError) {
                throw new Error((data.message ? data.message : 'Please try again.'));
            } else {
                return data;
            }
        })

        //for demo purposes, we add a timeout/delay, so we can see that there is a (pretty) temporary spinner
        .then(x => new Promise(resolve => setTimeout(() => resolve(x), 150))));
}

export function get(path: string, token: string) {

    return (fetchApi(`${config.BACKEND_API}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }));
}

export function post(path: string, token: string, data: { [key: string]: string }) {

    const formData = new FormData();
    for (const key of Object.keys(data)) {
        formData.set(key, data[key]);
    }

    return (fetchApi(`${config.BACKEND_API}${path}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    }));
}

export function remove(path: string, token: string) {

    return (fetchApi(`${config.BACKEND_API}${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }));
}
