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
function signUp(){

  const  dbCon = firebase.database().ref('/WeatherApp');

  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("pwd").value;
  let zip = document.getElementById("zip").value;
  let terms = document.getElementById("terms").checked;
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
  else if(pwd==""){
    alert("Please enter Password.");
  }
  else if(zip==""){
    alert("Please enter ZIP Code.");
  }
  else if(terms==false){
    alert("Please agree Terms & Coditions.");
  }
  else{
    dbCon.orderByChild('email').equalTo(email).once('value').then(emailFound=>{
      var emailFound = emailFound.val();
      if(emailFound){
        //document.getElementById('exist').innerHTML= "User Already exist. Please sign In."
        alert("User Already exist. Please sign In.");
        fname=""; lname=''; email=''; pwd=''; zip=''; terms=!terms;
      }
      else{
        //enter User in firebase
        let newUser = {
                       fname:fname,
                       lname:lname,
                       email:email,
                       pwd:pwd,
                       zip:zip,
                       terms:terms
                     }
        dbCon.push(newUser);
        fname=''; lname=''; email=''; pwd=''; zip=''; terms=!terms;
      }

    });
  }

}

//signIn
function signIn(){
  const  dbCon = firebase.database().ref('WeatherApp');

  const emailIn = document.getElementById("emailIn").value;
  const pwdIn = document.getElementById("pwdIn").value;
  if(emailIn==""){
    alert("Please enter Email.");
  }
  else if(pwdIn==""){
    alert("Please enter Password.");
  }else{
    dbCon.orderByChild('email').equalTo(emailIn).once('value').then(emailFound=>{
      var emailFound = emailFound.val();
      if(emailFound){
        Object.keys(emailFound).map(k => {
            if(emailFound[k].pwd != pwdIn){
                alert("Please enter correct Password")
                }
                else{
                  localStorage.setItem("email", emailIn);
                  localStorage.setItem("pwd", pwdIn);
                  localStorage.setItem("fname", emailFound[k].fname);
                  localStorage.setItem("lname", emailFound[k].lname);
                  localStorage.setItem("zip", emailFound[k].zip);
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
