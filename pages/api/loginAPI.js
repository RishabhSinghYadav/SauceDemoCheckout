class LoginAPI {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async login(username, password) {
    const response = await this.apiContext.post('/v1/login', {
      data: { username, password }
    });
    return response;
  }
}

module.exports = LoginAPI;
