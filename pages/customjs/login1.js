/*var assigned_id="";
var propertyRef="";

$(document).ready(function(){
    toggleSignIn();
});*/

 function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          //document.getElementById('submit').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location = '../../examples/pages/user.html';
        }
      })
      //document.getElementById('submit').disabled = true;
      
    }

    function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            // [START_EXCLUDE]
            document.getElementById('submit').textContent = 'Signed in';
           // document.getElementById('submit').textContent = 'Sign out';
         //   document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
           //   document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
          } else {

            
            alert(user.uid);
            // User is signed out.
            // [START_EXCLUDE]
         //   document.getElementById('submit').textContent = 'Signed out';
            document.getElementById('submit').textContent = 'Sign in';
           // document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('submit').addEventListener('click', toggleSignIn, false);
     /*   document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
        document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);*/
    }

    window.onload = function() {
        initApp();
      };