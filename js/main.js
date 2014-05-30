(function(){

  "use strict";
  var items = 0;

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("input, select").change(calculateTheatreExperience);
    $("input, select").change(calculateTotal);
  }

  function getNames(){
    var names = [];
    var $names = $("input[name=names]");
    $names.each(function(index, name){
      name = $(name).val();
      if (name){
        names.push(name);
      }
    });
    names.join();
    return names;
  }

  function calculateTotal(){
  var total = 0;
    $("select > option:selected").each(function(){
      var $qty = $(this).text();
      var $cost = ($(this).closest("tr").find(".cost").text());
      var cost = $cost.replace("$", "");
      cost *= 1;
      var cartItemTotal = $qty * cost
      total += cartItemTotal;
    });
    $("#total").text(total);
    return total;
  }

  function getClassTotal(){
    var total = 0;
    $("select > option:selected").each(function(){
    var $qty = $(this).text() * 1;
      if ($qty > 0){
        total ++;
      }
    });
    console.log(total);
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

  function buildCart(url){
    $("select > option:selected").each(function(){
      var $qty = $(this).text() *1;
      if ($qty > 0){
        items ++;
        var $product_id = $(this).closest("tr").find("td").first().attr('id');
        var $description = $(this).closest("tr").find("td").first().text();
        var $amount = ($(this).closest("tr").find(".cost").text());
        var amount = $amount.replace("$", "");
        amount *= 1;
        var $quantity = $(this).text();
        url += "&cart[items]["+items+"][desc]="+$description;
        url += "&cart[items]["+items+"][amount]="+amount;
        url += "&cart[items]["+items+"][product_id]="+$product_id;
        url += "&cart[items]["+items+"][quantity]="+$quantity;
      }
    });
    return url;
  }

  function buildUrl(){
    var names = getNames();
    var url = "https://rcsf.trail-staging.us/widget?campaign_id=2834&schedule=0&success_url=http%3A//www.rochesterchristianschool.org/&cart[desc]=Camp"
    var $assistance = $("#assistance").is(":checked")
    url = buildCart(url);

    if (names.length !== 0) {
      items ++;
      url += "&cart[items]["+items+"][notes]="+names;
    }

    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=0";
    };

    //window.location.href = url;
    console.log(url);
  }

})();
