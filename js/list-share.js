// list-share js tested at this jsfiddle
// https://jsfiddle.net/awolf2904/kebe6ayq/

var boardJson = { // for testing
    lists: [{
        id: 0,
        name: 'Demo list'
    }, {
        id: 1,
        name: 'Example list'
    }],
    cards: [{
        listId: 0,
        title: 'Demo'
    },
    {
        listId: 1,
        title: 'Demo1'
    },
]
};

var selection = {
    lists: [],
    cards: []
};

var DEFAULT_STATE_CHECKBOXES = true;

var ListShare = {
    addEventListeners: function() {
        document.getElementById('selectedLists')
        .addEventListener('change', this.events.onChange);

        document.getElementById('btnShare').addEventListener('click', this.share);
    },
    renderOutput: function() {
        var $out = document.getElementById('sharedData');
        var $li = document.createElement('li');
        $out.innerHTML = '';
        for(var selected of selection.lists) {
            if (selected && selected.id) {
                $li.innerHTML = selected.name;
                $out.appendChild($li.cloneNode(true));
            }
        }
    },
    initForm: function(boardJson, cb) {
        var $checkboxContainer = document.createElement('div');
        this.cb = cb;
        for (var list of boardJson.lists) {
            console.log(list);
            var $span = document.createElement('span');
            var $input = document.createElement('input');

            $span.innerHTML = list.name;
            $input.type = 'checkbox';
            $input.id = list.id;
            $input.value = list.name;
            $input.checked = DEFAULT_STATE_CHECKBOXES;

            $checkboxContainer.appendChild($input);
            $checkboxContainer.appendChild($span);
        }

        var inputs = $checkboxContainer.getElementsByTagName('INPUT');

        for(var input of inputs) {
            console.log(input);
            input.setAttribute('checked', DEFAULT_STATE_CHECKBOXES);
            if (DEFAULT_STATE_CHECKBOXES) {
                selection.lists[input.id] = {
                    id: input.id,
                    name: input.value
                };

                console.log('input val', input.value);
            }
        };

        console.log('initial selection', selection);
        document.getElementById('selectedLists').appendChild($checkboxContainer);

        // add event listeners
        ListShare.addEventListeners();

        ListShare.renderOutput();
    },
    events: {
        onChange: function(evt) {
            console.log('input change', evt, evt.target.checked);
            if (evt.target.checked) {
                selection.lists[evt.target.id] = {
                    id: evt.target.id,
                    name: evt.target.value
                }
            }
            else
            {
                selection.lists[evt.target.id] = undefined;
            }
            console.log(selection);
            ListShare.renderOutput();
        },
        share: function(evt) {
            // filter data here
            // 1. filter lists
            // 2. remove cards not selected

            var filtered = {
                lists: [],
                cards: []
            };

            var selectedIds = selection.lists.map(function(list) {
                //console.log(list);
                return list && list.id;
            });

            console.log('ids', selectedIds, selection);

            filtered.lists = boardJson.lists.filter(function(list) {
                //console.log(list.id.toString(), selectedIds.indexOf(list.id.toString()));
                return selectedIds.indexOf(list.id.toString()) !== -1;
            });
            console.log(filtered);
            //alert('sharing selection' + JSON.stringify(filtered));
            ListShare.cb(filtered);
        }
    }
}



//initForm();
//renderOutput();

window.listShare = {
    init: ListShare.initForm
};

// module.exports = {
//     init: ListShare.initForm
// };
