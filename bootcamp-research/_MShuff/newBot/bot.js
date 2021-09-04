class Bot {
    constructor(client, token) {
        this.client = client;
        this.token = token;
    }

    login() {
        if (this.checkToken()) {
            this.client.login(this.token);
        }
        this.client.once('ready', () => {
            console.log('Login Successful.');
        });
    }

    checkToken() {
        if (typeof this.token !== 'string') {
            throw new TypeError('Token must be a string.');
        }
        return true;
    }
}

module.exports = Bot;
