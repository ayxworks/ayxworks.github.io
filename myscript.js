//Some navigation bar
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
//Fixed nav bar on the top (en INDEX)
$(document).ready(function() {
  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 1161) {
      $('#nav_bar_index').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 1162) {
      $('#nav_bar_index').removeClass('navbar-fixed');
    }
  });
});

//Fixed nav bar on the top (en about us)
$(document).ready(function() {
  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 410) {
      $('#nav_bar_aboutus').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 411) {
      $('#nav_bar_aboutus').removeClass('navbar-fixed');
    }
  });
});
//Fixed nav bar on the top
$(document).ready(function() {
  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 0) {
      $('#nav_bar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 1) {
      $('#nav_bar').removeClass('navbar-fixed');
    }
  });
});

//Creating an embedded google map

function myMap() {
var mapProp= {
    center: new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

//Slide show image carousel
var myIndex = 0;

$("document").ready(function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 5000); // Change image every 2 seconds
});