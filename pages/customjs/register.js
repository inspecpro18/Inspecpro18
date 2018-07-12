$(document).ready(function(){
    $("#submit").click(function(){
        register();
    });
});

function register()
{
    var email = $("#Email").val();
    var password= $("#Password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
        alert(error.message);
    });

}