/* global TrelloPowerUp */
var DEFAULT_STATE_CHECKBOXES = true;
var t = TrelloPowerUp.iframe();

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  var boardJson = t.args[1];
  var $checkboxContainer = $('<div><input type="checkbox"><span></span></div>');
  for(var list in boardJson.lists) {
      $checkboxContainer.find('input').prop('id', list.id);
      $('#selectedLists').append($checkboxContainer.clone());
  }

  $('body').find('input').prop('checked', DEFAULT_STATE_CHECKBOXES);

  console.log(t.args, arguments);
});
