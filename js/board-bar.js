/* global TrelloPowerUp, jQuery, listShare, template*/

var DEFAULT_STATE_CHECKBOXES = true;
var t = TrelloPowerUp.iframe();

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
});

var boardJson = t.args[1];

listShare.init(boardJson, function(data) {
    // callback to trigger share with filteredData
    console.log('share callback', data);
    template.shareBoardAction(data);
});
