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

    var today = new Date();
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

  function costPerMonth(monthsOff){
    var discount = Math.floor(175 / 9);
    var newTotal = 175;
    for (var i = 0; i < monthsOff; i++){
      newTotal = (newTotal - discount);
    }
    return newTotal;
  }

  function monthsOff(){
    var $theatreCombo = $("#jazz-4-cost").text();
    var cost1 = $theatreCombo.replace("$", "");
    cost1 *= 1;
    var $theatre = $("#monthly").text();
    var cost2 = $theatre.replace("$", "");
    cost2 *= 1;

    var monthCalculation = monthsRemaining();
    switch (monthCalculation) {
      case 0:
        var newTotal = costPerMonth(1);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 1;
      case 1:
        var newTotal = costPerMonth(2);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 2;
      case 2:
        var newTotal = costPerMonth(3);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 3;
      case 3:
        var newTotal = costPerMonth(4);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 4;
      case 4:
        var newTotal = costPerMonth(5);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 5;
      case -7:
        var newTotal = costPerMonth(6);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 6;
      case -6:
        var newTotal = costPerMonth(7);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 7;
      case -5:
        var newTotal = costPerMonth(8);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 8;
      case -4:
        var newTotal = costPerMonth(9);
        $("#jazz-4-cost").text("$"+newTotal);
        $("#monthly").text("$"+newTotal);
        return 9;
      default:
        $("#jazz-4-cost").text("$175");
        $("#monthly").text("$175");
        return 0;
    }
  }

  function addJazz4ToCost(){
    monthsOff();
    var $costTd = $("#jazz-4-cost");
    var dynamicPrice = $costTd.text();
    dynamicPrice = dynamicPrice.replace("$", "");
    dynamicPrice *= 1;

    var $jazz4Selected = $("select.jazz-4 > option:selected");
    var $amount = $jazz4Selected.closest("tr").find(".cost");
    $amount.text("$210");
    var $cost = $jazz4Selected.closest("tr").find(".cost").text();
    var cost = $cost.replace("$", "");
    cost *= 1;
    if ($jazz4Selected.val() === "none"){
      $costTd.text("$"+dynamicPrice);
      return 0;
    }else if ($jazz4Selected.text() === "Both"){
      $amount.text("$420");
      $costTd.text("$"+(dynamicPrice + 25));
      return 420;
    }else {
      $costTd.text("$"+(dynamicPrice + 25));
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
    var $cost = $preImagination.closest("tr").find(".cost");
    $cost.text("$125");
    if ($preImagination.is(":checked")){
      var items = calculatePreSchool();
      var $amount = $cost.text();
      var cost = $amount.replace("$", "");
      cost *= 1;
      switch (items) {
        case 1:
          cost -= 5
          $cost.text("$"+cost);
          break;
        case 2:
          cost -= 20
          $cost.text("$"+cost);
          break;
        case 3:
          cost -= 30
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
    var url = "https://stageright.trail-staging.us/widget?campaign_id=2904&schedule=0&cart[desc]=Camps";
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
      window.location.href = url;
      //alert(url);
    }
  }

})();
