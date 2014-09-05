$(function() {
  var app = window.wfm;

  if (!app.authHelper) {
    throw new Error('required app-auth');
  }

  if (!app.lgr) {
    throw new Error('required lgr-helper');
  }

  if (!app.cnst) {
    throw new Error('required cnst-helper');
  }

  // url parameter should point to a resource listing url as per Swagger Spec
  // dom_id parameter is the the id of a dom element inside which SwaggerUi will put the user interface for swagger
  // booleanValues SwaggerUI renders boolean data types as a dropdown. By default it provides a 'true' and 'false' string as the possible choices. You can use this parameter to change the values in dropdown to be something else, for example 0 and 1 by setting booleanValues to new Array(0, 1)
  // docExpansion controls how the API listing is displayed. It can be set to 'none' (default), 'list' (shows operations for each resource), or 'full' (fully expanded: shows operations and their details)
  // onComplete is a callback function parameter which can be passed to be notified of when SwaggerUI has completed rendering successfully.
  // onFailure is a callback function parameter which can be passed to be notified of when SwaggerUI encountered a failure was unable to render.
  // All other parameters are explained in greater detail below

  var cbkOnFailure = function(data) {
    app.lgr.info({
      "Unable to Load SwaggerUI": data
    });
  };

  var cbkOnComplete = function() { // swaggerApi, swaggerUi
    app.lgr.info("Loaded SwaggerUI");
    // // if (typeof initOAuth === "function") {
    // // initOAuth({
    // // clientId : app.cnst.auth.ID_OF_AUTH_CLIENT,
    // // realm : "api-realm",
    // // appName : "api-docs-app"
    // // });
    // // }

    $('pre code').each(function(i, e) {
      window.hljs.highlightBlock(e);
    });
  };

  window.swaggerUi = new window.SwaggerUi({
    url: app.cnst.API_URI + "/api/api-docs",
    dom_id: app.cnst.BASE_CONTAINER,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
    //useJQuery : true,
    onComplete: cbkOnComplete,
    onFailure: cbkOnFailure,
    docExpansion: "none"
  });

  window.swaggerUi.load();

  $('#login-btn').on('click', app.authHelper.clickLoginBtn);
  $('#logout-btn').on('click', app.authHelper.clickLogoutBtn);
});
