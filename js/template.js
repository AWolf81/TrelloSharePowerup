/* global Trello, jQuery, TrelloPowerUp */
var SHARE_ICON = './images/fa-share-alt.svg';
var PRINTER_URL = 'https://awolf81.github.io/TrelloPrinter/?url=';

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
                              url: PRINTER_URL + sharedURL,
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
          ]
      });
    });
}

// share board or panel
function shareCallback(type, t) {
    return t.board('all')
        .then(function(promiseResult) {
            // always load board data --> needed to post or display selection
            if (type === 'board') {
                return postJSON(promiseResult).then(function(res, status, jqXHR) {
                    var sharedURL  = jqXHR.getResponseHeader('Location');
                    return t.popup({
                        url: PRINTER_URL + sharedURL,
                        name: 'Shared board successful'
                    })
                    .then(function(){
                      return t.closePopup();
                    })
                },
                function(err) {
                    console.log(err); // todo --> show notifcation
                });
            }
            else {
                // load board bar and display checkboxes with panels to export
                return t.boardBar({
                    url: './board-bar.html',
                    height: 200
                })
                .then(function(){
                    return t.closePopup();
                });
            }
        });

}

var boardButtonCallback = function(t){
  return t.popup({
    title: 'Share board or panel',
    items: [
        {
            text: 'Board',
            callback: shareCallback('board', t)
        },
        {
            text: 'Panel',
            callback: shareCallback('panel', t)
        }
    ]
      /*{
        text: 'Open Overlay',
        callback: function(t){
          return t.overlay({
            url: './overlay.html',
            args: { rand: (Math.random() * 100).toFixed(0) }
          })
          .then(function(){
            return t.closePopup();
          });
        }
      },
      {
        text: 'Open Board Bar',
        callback: function(t){
          return t.boardBar({
            url: './board-bar.html',
            height: 200
          })
          .then(function(){
            return t.closePopup();
          });
        }
      }
    ]*/
  });
};

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: SHARE_ICON,
      text: 'Share',
      callback: cardButtonCallback
    }];
  },
  'board-buttons': function(t, options){
    return [{
      icon: SHARE_ICON,
      text: 'Share board or panel',
      callback: boardButtonCallback
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
