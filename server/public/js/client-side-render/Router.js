export default class Router {
    constructor({ ApiUri }){
        this.ApiUri = ApiUri;
    }

    async request({ method, body }){
        console.log(body)
        try {
            const response = await fetch(`${this.ApiUri}/${method}`, { //http://localhost:3001/api/message
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}