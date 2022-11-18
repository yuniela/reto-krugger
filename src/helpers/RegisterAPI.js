class RegisterAPI{
    constructor(){
        this.url = "http://localhost:4000"
        this.routes = {
            auth : '/auth/',
            users : '/users/',
        }

    }
    
    async auth(dir, formLogin){
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formLogin),
           
        }
        const resp = await fetch(this.url + this.routes.auth + dir, options );
        const login = await resp.json();
        return login;
    }


    async users(formLogin){
        const user = JSON.parse(localStorage.getItem('user'))
        let options = {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formLogin),
        }
        const resp = await fetch(this.url + this.routes.users, options );
        const save = await resp.json();
        return save;
    }

    async getUsers(){
        let options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                'Content-Type': 'application/json',
            },
    }
        const resp = await fetch(this.url + this.routes.users, options);
        const users = await resp.json();
        return users;
    }

    
}

export default RegisterAPI;