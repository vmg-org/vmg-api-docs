(function(app) {
  app.cnst = {};

  // REQ
  app.cnst.API_URI = 'https://video-merge.herokuapp.com';

  app.cnst.SESSION_ENDPOINT = app.cnst.API_URI + '/api/account/session';

  app.cnst.BASE_CONTAINER = 'swagger-ui-container';

  // AUTH

  app.cnst.auth = {};

  app.cnst.auth.ID_OF_AUTH_CLIENT = 'api-docs';
  app.cnst.auth.REDIRECT_URI = '//ivanrave.github.io/vmg-api-docs' + '/handle-auth-code.html';

  app.cnst.auth.AUTH_URI = '//facebook.com' + '/dialog/authorize';
})(window.wfm);
