 const loginForm = document.getElementsById("login-form");

 if(loginForm){
     loginForm.addEventListener("submit", event => event.preventDefault());
   }

function checkIfExist()
{
    var storedUsersCheck = new Array();
    storedUsersCheck = JSON.parse((localStorage.getItem("users"))) || [];

    var usernameCheck = document.getElementById('username').value;
    for(let i = 0; i < storedUsersCheck.length; i++)
    {
        if(usernameCheck == storedUsersCheck[i].username)
        { 
            return true;
        }
    }
    return false;
}

function store(){
    var a = new Array();
    user = new Object();

    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var lowerCaseLetters = /[a-z]/g;
    var containCharacteer = /@/;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

     user={
         username: username.value,
         password: password.value
     };

     if(localStorage.length)
     {
     a=JSON.parse((localStorage.getItem("users")));
     }

     a.push(user);

    if(checkIfExist()){
        alert("User already exists!");
    }
    else if(username.value.length == 0 && password.value.length == 0){ 
        alert('Please fill in email'); 

    }else if(username.value.length == 0){
        alert('Please fill in password');       

    }else if(password.value.length == 0){
        alert('Please fill in email and password');       

    }else if(!username.value.match(containCharacteer)){
        alert('Invalid e-mail');       

    }else if(password.value.length < 8){
        alert('Minimum of 8 characters');        

    }else if(!password.value.match(numbers)){
        alert('please add 1 number');      

    }else if(!password.value.match(upperCaseLetters)){
        alert('please add 1 uppercase letter');        

    }else if(!password.value.match(lowerCaseLetters)){
        alert('please add 1 lowercase letter');        

    }else{;
        localStorage.setItem('users', JSON.stringify(a));
        alert('Your account has been created');
        document.changeAction.action = 'login.html';
       // window.open("login.html");
       //window.location = "login.html";
    }
}

function check(){
    var storedUsers = new Array();
    storedUsers = JSON.parse((localStorage.getItem("users"))) || [];

    var logUsername = document.getElementById('logUsername').value;
    var logPassword = document.getElementById('logPassword').value;

    for(let i = 0; i < storedUsers.length; i++)
    {
        if(logUsername == storedUsers[i].username && logPassword == storedUsers[i].password){
            document.changeAction.action = 'movie_list.html';
            localStorage.setItem("logged", logUsername);
            //window.location.href = "movie_list.html";
            //window.location = "movie_list_noJSON.html";
            // window.open('movie_list.html');
            return;
        }
    }
    alert('Error on login');
}














    //var userRemember = document.getElementById("rememberMe");
// var i;

// for (i = 0; i < localStorage.length; i++)   {
//     console.log(i + localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
// }

// function deleteItems() {
//     localStorage.clear();
//   }
  