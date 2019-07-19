export function initialize(store, router) {
    axios.interceptors.response.use(null, (error) => {
        return Promise.reject(error);
    });
}
