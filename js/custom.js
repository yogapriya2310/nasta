(function ($) {
  "use strict";

  // NAVBAR
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  $(function () {
    $(".hero-slides").vegas({
      slides: [
        { src: "images/frontpage/dishes-in-clay-vessels.jpg" },
        { src: "images/frontpage/frirnds-at-restaurant-girl-laughing.jpg" },
        { src: "images/frontpage/baby-and-mother-with-traditional-sadhya.jpg" },
        { src: "images/frontpage/soudi-couple-sharing-food.avif" },
      ],
      timer: false,
      animation: "kenburns",
    });
  });

  // CUSTOM LINK
  $(".smoothscroll").click(function () {
    var el = $(this).attr("href");
    var elWrapped = $(el);
    var header_height = $(".navbar").height() + 60;

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $("body,html").animate(
        {
          scrollTop: totalScroll,
        },
        300
      );
    }
  });
})(window.jQuery);

$(document).ready(function () {
  $("#formsubmit").on("submit", function (e) {
    e.preventDefault();
  });

   var defaultValue = $("#booking-form-time").val();

   console.log(defaultValue)

  let formdata = {};

  let cdate = new Date();
  let thisdate = cdate.getDate() < 10 ? `0${cdate.getDate()}` : cdate.getDate();
  let thismonth =
    cdate.getMonth() + 1 < 10
      ? `0${cdate.getMonth() + 1}`
      : cdate.getMonth() + 1;
  var chr = cdate.getHours() < 10 ? `0${cdate.getHours()}` : cdate.getHours();
  var cmins = cdate.getMinutes() < 10 ? `0${cdate.getMinutes()}` : cdate.getMinutes();
  let currenttime = `${chr}:${cmins}`

  const todaydate = `${cdate.getFullYear()}-${thismonth}-${thisdate}`;
  // console.log(todaydate);

  const nameRegex = /^[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/;
  $("#booking-form-name").on("change", function (e) {
    var cusname = e.target.value;
    if (nameRegex.test(cusname)) {
      formdata.name = cusname;
    } else {
      alert("Please enter a valid name.");
      e.target.value = ""
    }
  });

  const mobileNumberRegex = /^\d{10}$/;
  $("#booking-form-phone").on("change", function (e) {
    const cusphone = e.target.value;
    if (mobileNumberRegex.test(cusphone)) {
      formdata.phone = cusphone;
    } else {
      alert("Please enter a valid phone number.");
      e.target.value = ""
    }
  });

  $("#booking-form-time").on("change", function (e) {
    let seletedtime = e.target.value;
    if ( seletedtime !== "" ) {
      formdata.time = seletedtime;
    }
    else {
    alert("ahi")
      e.target.value = ""
    }
  
  });
  $("#booking-form-time").on("focus", function (e) {
      e.target.value = "00:00"
  });


  $("#booking-form-date").on("change", function (e) {
    let selecteddate = e.target.value ? e.target.value : "";
    // console.log(`selected date: ${selecteddate}`);  
    if (todaydate <= selecteddate) {
      formdata.date = selecteddate
    } else {
      alert("please select an available date");
      e.target.value = "";
    }
  });

  $("#booking-form-peop-number").on("change", function (e) {
    const selectedNoofpeople = e.target.value;
    if (selectedNoofpeople > 0) { formdata.numberOfPeople = e.target.value; }
    else { alert("Please enter the number of people"); e.target.value = "" }
  });

  $("#booking-form-message").on("change", function (e) {
    formdata.comment = e.target.value;
  });

  const ownerNum = "8190813513";

  $("#formsubmitbutton").on("click", function (e) {
    // const {name , phone , time, date, numberOfPeople, comment, test } = formdata

    const message = formdata.comment
      ? formdata.comment
      : "Hello nasta, Looking forward to a wonderful dining experience!";

    var url =
      "https://wa.me/" +
      ownerNum +
      "?text=" +
      "Name: " +
      formdata.name +
      "%0a" +
      "Phone: " +
      formdata.phone +
      "%0a" +
      "Time: " +
      formdata.time +
      "%0a" +
      "Date: " +
      formdata.date +
      "%0a" +
      "Number of people: " +
      formdata.numberOfPeople +
      "%0a" +
      message;

    if (
      formdata &&
      formdata.name   &&
      formdata.phone   &&
      formdata.time   &&
      formdata.date   &&
      formdata.numberOfPeople
    ) {
      window.open(url, "_blank");
      setTimeout(() => {
        $("#booking-form-name").val("");
        $("#booking-form-phone").val("");
        $("#booking-form-time").val("00:00");
        $("#booking-form-date").val("");
        $("#booking-form-peop-number").val("");
        $("#booking-form-message").val("");
        formdata = {};
      }, 1000);
    } else {
      console.log("please fill the required data");
    }
  });
});
