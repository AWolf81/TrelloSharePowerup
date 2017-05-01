/* global Trello, jQuery, TrelloPowerUp */
var SHARE_ICON = './images/fa-share-alt.svg';

function postJSON(data) {
    return $.ajax('https://jsonblob.com/api/jsonBlob', {
    	method: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

var cardButtonCallback = function(t) {
    return t.card('all')
    .then(function(promiseResult) {
      console.log(promiseResult);
      var url = promiseResult.url;
      return t.popup({
          title: 'Share this card',
          items: [
              {
                text: 'Share card: ' + url,
                url: url,
                callback: function(t){
                  return postJSON(promiseResult).then(
                      function(res, status, jqXHR) {
                          var sharedURL  = jqXHR.getResponseHeader('Location');
                          return t.attach({
                              url: 'https://awolf81.github.io/TrelloPrinter/?url=' + sharedURL,
                              name: 'Shared JSON'

                          })
                          .then(function(){
                            return t.closePopup();
                          })
                      },
                      function(err) {
                          console.log(err); // todo --> show notifcation
                      }
                  )
                }
              }
          ],
          search: {
              count: 5,
              placeholder: 'Search National Parks',
              empty: 'No parks found'
          }
      });
    });
}

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: SHARE_ICON,
      text: 'Share',
      callback: cardButtonCallback
    }];
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
