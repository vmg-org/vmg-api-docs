(function(app) {
	// In 3rd side libs - need only constants
  app = app || {};
  app.cnst = {};

  // REQ
  app.cnst.API_URI = 'http://ec2-54-77-111-21.eu-west-1.compute.amazonaws.com';
	//'https://video-merge.herokuapp.com';

  app.cnst.SESSION_ENDPOINT = app.cnst.API_URI + '/api/account/session';

  app.cnst.BASE_CONTAINER = 'swagger-ui-container';

  // AUTH

  app.cnst.auth = {};

  app.cnst.auth.ID_OF_AUTH_CLIENT = 'api-docs';
  app.cnst.auth.REDIRECT_URI = '//ivanrave.github.io/vmg-api-docs' + '/handle-auth-code.html';

  app.cnst.auth.AUTH_URI = '//facebook.com' + '/dialog/authorize';
})(window.wfm);
