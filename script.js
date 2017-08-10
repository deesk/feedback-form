
$( document ).ready(function() {
    currentPosition();
});

const  firstName = $("#first-name input");
const lastName = $("#last-name input");
const email = $("#email input");
const feedback = $("#feedback textarea")
const errMsg = $(".err-msg");

errMsg.hide();
$("button").click(validate);

// user input valitation function
function validate() {
  errMsg.css('background', 'red')
  let emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  let nameReg = /^[a-z]+$/i;

  if(!nameReg.test(firstName.val().trim())) {
    errMsg.text("Please Enter Valid First Name");
    errMsg.show(1000);
  } else if(!nameReg.test(lastName.val().trim())) {
    errMsg.text("Please Enter Valid Last Name");
    errMsg.show();
  } else if(!emailReg.test(email.val().trim())) {
    errMsg.text("Please Enter Valid Email Address");
    errMsg.show();
  } else if(feedback.val().trim() === "") {
    errMsg.text("Please Enter Feedback");
    errMsg.show();
  } else {
    errMsg.css('background', 'green')
    errMsg.text("Thank You for your Feedback!!");
    firstName.val("");
    lastName.val("");
    email.val("");
    feedback.val("");
  }
}
// current Position
function currentPosition() {
  let showMap = $("#map");
  if(!navigator.geolocation) {
    showMap.text("<p> Geolocation is not supported by your browser</p>")
    return ;
  }
  function success(position) {
      let lat  = position.coords.latitude;
      let lon = position.coords.longitude;
      let img = new Image();

      img.src = "https://maps.googleapis.com/maps/api/staticmap?markers=size:large%7Ccolor:red%7C" + lat + "," + lon + "&zoom=13&sensor=true&size=1000x300";
      showMap.append(img);
  }
  function error() {
    showMap.append($("<p> Unable to retrieve your location </p> "));
  }
  navigator.geolocation.getCurrentPosition(success, error);
}
