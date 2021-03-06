/* global Trello, jQuery, TrelloPowerUp */
var SHARE_ICON = './images/fa-share-alt.svg';
var PRINTER_URL = 'https://awolf81.github.io/TrelloPrinter/?url=';
var Promise = TrelloPowerUp.Promise;

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

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
                text: 'Shared card: ' + url,
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
    console.log(window.location.href, t, Promise);
    return Promise.join(
        t.lists('id', 'name'),
        t.cards('all'),
        t.board('all')
            // json export would contain the following items:
                // fields: "all",
                // actions: "all",
                // action_fields: "all",
                // actions_limit: 1000,
                // cards: "all", --> exported
                // card_fields: "all",
                // card_attachments: true,
                // labels: "all",
                // lists: "all", --> exported
                // list_fields: "all",
                // members: "all", --> exported
                // member_fields: "all",
                // checklists: "all",
                // checklist_fields: "all",
                // organization: false
        )
        .then(function(promiseResults) { // gets all lists with card infos (except comments)
            // console.log(promiseResults);
            var boardJson = $.extend({},
                promiseResults[2], // board inf
                {
                lists: promiseResults[0], //lists
                cards: promiseResults[1] // cards
            });

            if (type === 'board') {
                return shareBoardAction(boardJson);
                    /*.then(function(){
                      return t.closePopup();
                  })*/
            }
            else {
                // load board bar and display checkboxes with panels to export
                return t.boardBar({
                    url: './board-bar.html',
                    height: 200,
                    args: boardJson
                })
                .then(function(){
                    return t.closePopup();
                });
            }
        });
}

// wrapper functions for sharing
var shareBoard = function(t) {
    return shareCallback('board', t);
};

var shareBoardAction = function(data) {
    if (!t) {
        t = TrelloPowerUp.iframe();
    }

    // action can be also used from board-bar
    return postJSON(data).then(function(res, status, jqXHR) {
        var sharedURL  = jqXHR.getResponseHeader('Location');
        return t.popup({
            //url: PRINTER_URL + sharedURL, // url loads html into the popup
            title: 'Created shared board successfully',
            items: [
                {
                    text: 'Open share',
                    callback: function(t) {
                        openInNewTab(PRINTER_URL + sharedURL),
                        t.closePopup();
                    }
                },
                {
                    text: 'Copy URL to clipboard',
                    callback: function(t) {
                        window.prompt("Copy to clipboard: Ctrl+C, Enter", PRINTER_URL + sharedURL);
                        t.closePopup();
                    }
                },
                {
                    text: 'Open share JSON',
                    callback: function(t) {
                        openInNewTab(sharedURL),
                        t.closePopup();
                    }
                },
            ]
        })
        .catch(t.NotHandled, function(evt) {
            console.log('not handled', evt, arguments);
        });
    }
        ,
        function(err) {
            console.log(err); // todo --> show notifcation
        });
};

var sharePanel = function(t) {
    return shareCallback('panel', t);
};

var boardButtonCallback = function(t){
  return t.popup({
    title: 'Share board or panel',
    items: [
        {
            text: 'Board',
            callback: shareBoard
        },
        {
            text: 'Panel',
            callback: sharePanel
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

window.template = {
    postJSON: postJSON,
    shareBoardAction: shareBoardAction
};
