if (bowser.name == 'Internet Explorer') {
	var element = document.getElementById('msgOldBrowser');
	element.style.display = 'block';
}

function CloseMsgOldBrowser() {
	var element = document.getElementById('msgOldBrowser');
	element.style.display = 'none';
}

$("document").ready(function() {
    $(".slider").rangeslider();
    $(".slider2").rangeslider2();
});

// Slider Amount

$.fn.rangeslider = function(options) {
    var obj = this;
    var defautValue = obj.attr("value");
    obj.wrap("<span class='range-slider'></span>");
    obj.after("<span class='slider-container'><span class='bar'><span></span></span><span class='bar-btn'></span></span>");
    obj.attr("oninput", "updateSlider(this)");
    updateSlider(this);
    return obj;
};

function updateSlider(passObj) {

  var obj = $(passObj);
  var value = obj.val();
  var min = obj.attr("min");
  var max = obj.attr("max");
  var range = Math.round(max - min);
  var percentage = Math.round((value - min) * 100 / range);
  var nextObj = obj.next();

  nextObj.find("span.bar-btn").css("left", percentage + "%");
  nextObj.find("span.bar > span").css("width", percentage + "%");

  var amount = percentage * 10000;
  $('#fieldAmount').val(amount);

  amount = accounting.formatMoney(amount, "$", 0, ",", ".");
  $('#amount').html(amount);

};

// Slider Time

$.fn.rangeslider2 = function(options) {
    var obj = this;
    var defautValue = obj.attr("value");
    obj.wrap("<span class='range-slider'></span>");
    obj.after("<span class='slider-container'><span class='bar'><span></span></span><span class='bar-btn'></span></span>");
    obj.attr("oninput", "updateSlider2(this)");
    updateSlider2(this);
    return obj;
};

function updateSlider2(passObj) {

  var obj = $(passObj);
  var value = obj.val();
  var min = obj.attr("min");
  var max = obj.attr("max");
  var range = Math.round(max - min);
  var percentage = Math.round((value - min) * 100 / range);
  var nextObj = obj.next();

  nextObj.find("span.bar-btn").css("left", percentage + "%");
  nextObj.find("span.bar > span").css("width", percentage + "%");

  var years = (percentage * 20) / 100;

  $('#fieldTime').val(years);

  var lbl = 'año';
  if (years > 1) {
      lbl = 'años';
  }

  $('#time').html(years + ' ' + lbl);

};