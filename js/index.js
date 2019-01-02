(function(){
  if(localStorage.getItem("email")){
  window.location.href = 'components/weather.html';
}
}())

$(document).ready(function() {

  // On click, remove class on active element, add it to the new one

  $('header nav a').click(function(e) {

    $('header nav a.active').removeClass('active');
    $(this).addClass('active');

    // Scroll to anchor

    $('html,body').animate({scrollTop: $($(this).attr('href')).offset().top - 70},'slow');

    e.preventDefault();
    return false;

  });

  // On scroll, remove class on active element and add it to the new one

  $(document).scroll(function() {

     var position = Math.floor($(this).scrollTop() / 800) + 1;

     $('header nav a.active').removeClass('active');
     $('header nav a.link-' + position).addClass('active');

  });

});


// signup
function signUpNow(){

  const  dbCon = firebase.database().ref('/WeatherApp');

  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("pwd").value;
  let zip = document.getElementById("zip").value;
  let terms = document.getElementById("terms").checked;
  const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const zipRe = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  // field validation

  if(fname==""){
    alert("Please enter First Name.");
  }
  else if(lname==""){
    alert("Please enter Last Name.");
  }
  else if(email==""){
    alert("Please enter Email.");
  }
  else if(emailRe.test(email)===false){
    alert("Please enter Valid Email.");
  }
  else if(pwd==""){
    alert("Please enter Password.");
  }
  else if(zip==""){
    alert("Please enter ZIP Code.");
  }
  else if(zipRe.test(zip)===false){
    alert("Please enter Valid Zip Code.");
  }
  else if(terms==false){
    alert("Please agree Terms & Coditions.");
  }
  else{
    dbCon.orderByChild('email').equalTo(email).once('value').then(emailFound=>{
      var emailFound = emailFound.val();
      if(emailFound){
        alert("User Already exist. Please sign In.");
      }
      else{

        //enter User in firebase
        document.getElementById('newUsr').innerHTML = "You have Signed Up successfully.";
        let newUser = {
                       fname:fname,
                       lname:lname,
                       email:email,
                       pwd:pwd,
                       zip:zip,
                       terms:terms
                     }
        dbCon.push(newUser);

      }

    });

    //Reset Input Fields
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('pwd').value = "";
    document.getElementById('zip').value = "";
    document.getElementById("terms").checked = false;
  }

}

//signIn
function signIn(){
  const  dbCon = firebase.database().ref('WeatherApp');

  const emailIn = document.getElementById("emailIn").value;
  const pwdIn = document.getElementById("pwdIn").value;
  const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailIn==""){
    alert("Please enter Email.");
  }
  else if(emailRe.test(emailIn)===false){
    alert("Please enter Valid Email.");
  }
  else if(pwdIn==""){
    alert("Please enter Password.");
  }else{
    dbCon.orderByChild('email').equalTo(emailIn).once('value').then(alreadyFound=>{
      var alreadyFound = alreadyFound.val();
      if(alreadyFound){
        Object.keys(alreadyFound).map(k => {
            if(alreadyFound[k].pwd != pwdIn){
                alert("Please enter correct Password")
                }
                else{
                  localStorage.setItem("email", emailIn);
                  localStorage.setItem("pwd", pwdIn);
                  localStorage.setItem("fname", alreadyFound[k].fname);
                  localStorage.setItem("lname", alreadyFound[k].lname);
                  localStorage.setItem("zip", alreadyFound[k].zip);
                  location.href = "components/weather.html";
                }
             })
      }
      else{
        alert(`${emailIn} dosen't exist. Please sign Up.`)
      }
    });
    }
  }
