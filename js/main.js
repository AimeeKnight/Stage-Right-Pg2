(function(){

  "use strict";
  var items = 0;

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("input, select").change(calculateTheatreExperience);
    $("input, select").change(calculateTotal);
    $("#submit").click(buildUrl);
    monthsOff();
  }

  function monthsRemaining(){
    var endDate = new Date(2015, 4, 24);
    var registration = new Date(2014, 7, 24);

    var today = new Date(2015, 4, 25);
    var registrationMonth = registration.getMonth();
    var registrationDay = registration.getDate();
    var currentMonth = today.getMonth();
    var currentDay = today.getDate();
    if (today > registration && today < endDate){
        if (currentDay > 24){
          var remainingMonths = currentMonth - registrationMonth;
        }else{
          var remainingMonths = (currentMonth - registrationMonth) - 1;
        }
    }else{
      var remainingMonths = 9;
    }
    return remainingMonths;
  }

  function monthsOff(){
    var monthCalculation = monthsRemaining();
    switch (monthCalculation) {
      case 0:
        var $costTd = $("#jazz-4-cost").text("$156");
        return 1;
      case 1:
        var $costTd = $("#jazz-4-cost").text("$137");
        return 2;
      case 2:
        var $costTd = $("#jazz-4-cost").text("$118");
        return 3;
      case 3:
        var $costTd = $("#jazz-4-cost").text("$99");
        return 4;
      case 4:
        var $costTd = $("#jazz-4-cost").text("$80");
        return 5;
      case -7:
        var $costTd = $("#jazz-4-cost").text("$61");
        return 6;
      case -6:
        var $costTd = $("#jazz-4-cost").text("$42");
        return 7;
      case -5:
        var $costTd = $("#jazz-4-cost").text("$23");
        return 8;
      case -4:
        var $costTd = $("#jazz-4-cost").text("$4");
        return 9;
      default:
        var $costTd = $("#jazz-4-cost").text("$175");
        return 0;
    }
  }

  function addJazz4ToCost(){
    var $costTd = $("#jazz-4-cost");
    var $jazz4Selected = $("select.jazz-4 > option:selected");
    var $amount = $jazz4Selected.closest("tr").find(".cost");
    $amount.text("$210");
    var $cost = $jazz4Selected.closest("tr").find(".cost").text();
    var cost = $cost.replace("$", "");
    cost *= 1;
    if ($jazz4Selected.val() === "none"){
      $costTd.text("$175");
      return 0;
    }else if ($jazz4Selected.text() === "Both"){
      $amount.text("$420");
      $costTd.text("$200");
      return 420;
    }else {
      $costTd.text("$200");
      return 210;
    }
  }

  function calculateTotal(){
    updatePreSchool();
    var total = 0;
    total += addJazz4ToCost();
    $('input:checkbox:checked').each(function(){
      var $cost = ($(this).closest("tr").find(".cost").text());
      var cost = $cost.replace("$", "");
      cost *= 1;
      total += cost;
    });
    $("#total").text(total);
    return total;
  }

  function getClassTotal(){
    var total = $('input:checkbox:checked').length;
    if ($("#assistance").is(":checked")){
      total -= 1;
    }
    if ($("select.jazz-4 > option:selected").val() !== "none"){
      total ++;
    }
    return total;
  }

  function calculateTheatreExperience(){
    var $costTd = $("#per-class-cost");
    var totalClasses = getClassTotal();
    if (totalClasses <= 5){
      switch (totalClasses) {
        case 1:
          $costTd.text("$130");
          break;
        case 2:
          $costTd.text("$100");
          break;
        case 3:
          $costTd.text("$90");
          break;
        case 4:
          $costTd.text("$80");
          break;
        case 5:
          $costTd.text("$70");
          break;
        default:
          $costTd.text("$130");
      }
    }
  }

  function calculatePreSchool(){
    var preItems = 0;
    if ($("input[name=14_pre_school_jazz]").is(":checked")){
      preItems ++;
    }
    if ($("input[name=14_pre_school_acting]").is(":checked")){
      preItems ++;
    }
    if ($("input[name=14_pre_school_voice]").is(":checked")){
      preItems ++;
    }
    return preItems;
  }

  function updatePreSchool(){
    var $preImagination = $("input[name=14_pre_school_imagination_workshop]");
    if ($preImagination.is(":checked")){
      var items = calculatePreSchool();
      var $cost = $preImagination.closest("tr").find(".cost");
      var $amount = $preImagination.closest("tr").find(".cost").text();
      var cost = $amount.replace("$", "");
      cost *= 1;
      switch (items) {
        case 1:
          cost -= 5
          $cost.text("$"+cost);
          break;
        case 2:
          cost -= 15
          $cost.text("$"+cost);
          break;
        case 3:
          cost -= 10
          $cost.text("$"+cost);
          break;
        default:
          $cost.text("$125");
       }
     }
  }

  function buildCart(url){
    $('input:checkbox:checked').each(function(i, checkbox){
      if($(checkbox).attr('id') !== "assistance"){
        items ++;
        var $product_id = $(this).attr("name");
        var $description = $(this).closest("tr").find("td").first().text();
        var $amount = ($(this).closest("tr").find(".cost").text());
        var amount = $amount.replace("$", "");
        amount *= 1;
        url += "&cart[items]["+items+"][amount]="+amount;
        url += "&cart[items]["+items+"][desc]="+$description;
        url += "&cart[items]["+items+"][product_id]="+$product_id;
        url += "&cart[items]["+items+"][quantity]=1";
      }
    });
    return url;
  }

  function buildUrl(){
    var $name = $("input[name=name]").val();
    var url = "https://stageright.trail-staging.us/?campaign_id=2904&schedule=1&max_times_donate=3";
    var $assistance = $("#assistance").is(":checked");
    url = buildCart(url);

    var $jazz4Selected = $("select.jazz-4 > option:selected");
    if ($jazz4Selected.val() !== "none"){
      var $amount = $jazz4Selected.closest("tr").find(".cost").text();
      var amount = $amount.replace("$", "");
      amount *= 1;
      var $jazz4_id = $("select.jazz-4 > option:selected").attr('id');

      items ++;
      url += "&cart[items]["+items+"][amount]="+amount;
      url += "&cart[items]["+items+"][desc]="+$jazz4Selected.val();
      url += "&cart[items]["+items+"][product_id]="+$jazz4_id;
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if ($name !== "") {
      items ++;
      url += "&cart[items]["+items+"][notes]="+$name;
    }
    if ($('#total').text() > 0){
      //window.location.href = url;
      alert(url);
    }
  }

})();
