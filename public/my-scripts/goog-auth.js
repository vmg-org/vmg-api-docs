// init for google auth
// https://developers.google.com/+/web/signin/javascript-flow


//var helper = (function() {
//  var BASE_API_PATH = 'plus/v1/';
//
//  return {
//    /**
//     * Hides the sign in button and starts the post-authorization operations.
//     *
//     * @param {Object} authResult An Object which contains the access token and
//     *   other authentication information.
//     */
//    onSignInCallback: function(authResult) {
//      // gapi.client.load('plus', 'v1', function() {
//      //$('#authResult').html('Auth Result:<br/>');
//      //for (var field in authResult) {
//      //  $('#authResult').append(' ' + field + ': ' +
//      //    authResult[field] + '<br/>');
//      // }
//      if (authResult['access_token']) {
//        //  $('#authOps').show('slow');
//        //    $('#gConnect').hide();
//        //  helper.profile();
//        //  helper.people();
//      } else if (authResult['error']) {
//        // alert(authResult['error']);
//        // There was an error, which means the user is not signed in.
//        // As an example, you can handle by writing to the console:
//        // console.log('There was an error: ' + authResult['error']);
//        // $('#authResult').append('Logged out');
//        // $('#authOps').hide('slow');
//        //  $('#gConnect').show();
//      }
//      console.log('authResult', authResult);
//      // });
//    },
//
//    /**
//     * Calls the OAuth2 endpoint to disconnect the app for the user.
//     */
//    disconnect: function() {
//      // Revoke the access token.
//      $.ajax({
//        type: 'GET',
//        url: 'https://accounts.google.com/o/oauth2/revoke?token=' +
//          gapi.auth.getToken().access_token,
//        async: false,
//        contentType: 'application/json',
//        dataType: 'jsonp',
//        success: function(result) {
//          console.log('revoke response: ' + result);
//          $('#authOps').hide();
//          $('#profile').empty();
//          $('#visiblePeople').empty();
//          $('#authResult').empty();
//          $('#gConnect').show();
//        },
//        error: function(e) {
//          console.log(e);
//        }
//      });
//    },
//
//    /**
//     * Gets and renders the list of people visible to this app.
//     */
//    people: function() {
//      var request = gapi.client.plus.people.list({
//        'userId': 'me',
//        'collection': 'visible'
//      });
//      request.execute(function(people) {
//        $('#visiblePeople').empty();
//        $('#visiblePeople').append(
//          'Number of people visible to this app: ' +
//          people.totalItems + '<br/>');
//        for (var personIndex in people.items) {
//          person = people.items[personIndex];
//          $('#visiblePeople').append('<img src="' + person.image.url +
//            '">');
//        }
//      });
//    },
//
//    /**
//     * Gets and renders the currently signed in user's profile data.
//     */
//    profile: function() {
//      var request = gapi.client.plus.people.get({
//        'userId': 'me'
//      });
//      request.execute(function(profile) {
//        $('#profile').empty();
//        if (profile.error) {
//          $('#profile').append(profile.error);
//          return;
//        }
//        $('#profile').append(
//          $('<p><img src=\"' + profile.image.url + '\"></p>'));
//        $('#profile').append(
//          $('<p>Hello ' + profile.displayName +
//            '!<br />Tagline: ' +
//            profile.tagline + '<br />About: ' + profile.aboutMe +
//            '</p>'));
//        if (profile.cover && profile.coverPhoto) {
//          $('#profile').append(
//            $('<p><img src=\"' + profile.cover.coverPhoto.url +
//              '\"></p>'));
//        }
//      });
//    }
//  };
//})();

/**
 * jQuery initialization
 */
//$(document).ready(function() {
//  //  $('#disconnect').click(helper.disconnect);
//  $('#loaderror').hide();
//  if ($('[data-clientid="YOUR_CLIENT_ID"]').length > 0) {
//    alert('This sample requires your OAuth credentials (client ID) ' +
//      'from the Google APIs console:\n' +
//      '    https://code.google.com/apis/console/#:access\n\n' +
//      'Find and replace YOUR_CLIENT_ID with your client ID.'
//    );
//  }
//});

function signinCallback(authResult) {
  console.log('executed callback');
  console.log(authResult);
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    $('.logon-wrap').hide();
    $('.logoff-wrap').show();
    $('#status').html('Welcome');
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

/**
 * Calls the helper method that handles the authentication flow.
 *
 * @param {Object} authResult An Object which contains the access token and
 *   other authentication information.
 */
//function onSignInCallback(authResult) {
// helper.onSignInCallback(authResult);
//}

/* Executed when the APIs finish loading */
function render() {
  console.log('render is executed');
  // Additional params including the callback, the rest of the params will
  // come from the page-level configuration.
  var additionalParams = {
    'callback': signinCallback
  };

  // Attach a click listener to a button to trigger the flow.
  var signinButton = document.getElementById('goog-sign-btn');
  signinButton.addEventListener('click', function() {
    gapi.auth.signIn(additionalParams); // Will use page level configuration
  });
}


(function() {
  var po = document.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  //  po.src = 'https://plus.google.com/js/client:plusone.js';
  po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
  console.log('a goog script is added');
})();
