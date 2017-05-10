  // Initialize Firebase
  function login(){
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  
    const emailText = email.value;
    const passwordText = password.value;
    const auth = firebase.auth();

    const response = auth.signInWithEmailAndPassword(emailText,passwordText);
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        window.location = 'dashboard.html'; //After successful login, user will be redirected to home.html
        }
      });
  }

  function signUp(){
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const emailText = email.value;
    const passwordText = password.value;
    const auth = firebase.auth();

    const response = auth.createUserWithEmailAndPassword(emailText,passwordText);
    alert(response);
  }

  function addData(){
    const messageInfo = document.getElementById('message');
    const messageTitle = document.getElementById('title');
    const date = document.getElementById('date');
   
    const messageValue = messageInfo.value;
    const msgTitle = messageTitle.value;
    const msgDate = date.value;
    const database = firebase.database();
    const ref = database.ref('List');

    var data = {
      title : msgTitle,
      message : messageValue,
      date : msgDate
    }

    ref.push(data);
 }

 function getData(){
  const database = firebase.database();
  const ref = database.ref('List');
  ref.on('value',gotData,errorData);
 }

 function gotData(data){
  console.log(data.val());
  var list = data.val();
  var keys = Object.keys(list);
  console.log(keys);
  var listing="";
  for (var i = 0; i < keys.length; i++) {
        var n = keys[i];
       var title = list[n].title;
       var message = list[n].message;
       var date = list[n].date;

       
       listing += "<div class='card'>";
       listing += "<div class='card-header'>";
       listing += "<p>"+title+"</p>";
       listing += "</div>";
       listing += "<div class='card-block'>";
       listing += "<blockquote class='card-blockquote'>";
       listing += "<p>"+message+"</p>";
       listing += "<p>"+date+"</p>";
       listing += "</blockquote>";
       listing += "</div>";
       listing += "</div>";
       $("#list").html(listing);
      
  }
 }

 function errorData(error){
    console.log('Error Occurred');
    console.log(error);
 }
