# Trello Share Power-Up
At the moment it's difficult to share a card with some one that's not in your
team. The only way is to add users to your board but then other cards
are visible too.

## A typical use-case for sharing is something like this:
You have created a task description that you like to share with a member at Upwork
or Freelancer to work on the task.
But if you created it in Trello the only way would be to copy&paste everything
and post it.

# Idea for the power-up
Copy the card to a Github Gist or a Bitbucket snippet and create a URL with UUID to display the card from the new source.

A copy is required because directly accessing the export json will only be visible by
board members.

# Testing the Power up for your team

Goto www.trello.com/power-ups/admin and enter https://awolf81.github.io/TrelloPrinter/manifest.json to install this power up.

# What will the power up do?
It picks the JSON data from your card (currently only title and description) and
posts a copy to http://jsonblob.com with a uuid that only you and anyone with access to your board will see. (It is also not indexed at Google because it's an REST endpoint.)

# Current Status of the power-up
Copy to jsonblob.com and rendering with TrelloPrinter is working. Basic sharing is working.
Next add Share to Panel and some smaller fixes.

Todos:

- [x] Copied the static github power-up from https://github.com/trello/power-up-template.
- [x] Check if a gist can be with a uuid. If not a webserver at Heroku would be required to store the exported cards. (Webserver would be better so it won't be indexed by Google - Gist probably get indexed)
- [x] Trigger export action and post it to jsonblob.com
- [x] Create a github page for loading the JSON to display the exported card
- [ ] Share a panel
- [ ] Trigger remove of data if attachment is removed
- [ ] Trigger update of the share if card changes
- [ ] Change caption of power-up card button to Share...

# Based on static Trello Power-Up Template
A static GitHub pages hosted sample Power-Up. Feel free to fork this repo as a starting point for your own Trello Power-Up.

Want to learn more about building Power-Ups for Trello? Visit our [developer site](https://developers.trello.com/power-ups) for all of the latest information. Want to try this sample out right away without waiting? Put this url (https://trello.github.io/power-up-template/manifest.json) into the prompt on https://trello.com/power-up-preview then you will see a new Power-Up called 'Static Template' show up in your list of Power-Ups.

## Features

### Attachment Sections
To see how the attachment-sections capability works, try attaching the following url to a card: http://www.nps.gov/yell/index.htm

### Attachment Thumbnail
To see how the attachment-thumbnail capability works, try attaching the following url onto any card: http://www.nps.gov/glac/index.htm

### Board Buttons
To see how the board-buttons capability works, try clicking the 'Template' button at the top right of the board after enabling this Power-Up.

### Card Badges & Card Detail Badges
To see how card-badges and card-detail-badges capabilities work, create some cards on a board with this Power-Up enabled that contain variations of the following keywords in the name:

- static - Shows a badge on the card that doesn't change
- dynamic - Shows a badge on the card that updates every 10 seconds
- green - colors the badge green
- yellow - colors the badge yellow
- red - colors the badge red

card-badges are what shows up on the front of cards, and card-detail-badges show up underneath the card name when you open a card.

### Card Buttons
To see how the card-buttons capability works, try opening a card after this Power-Up is enabled, and clicking the button called 'Template'.

### Card From Url
To see how the card-from-url capability works, try pasting (Ctrl+v) the following url onto any 'Add a card...' button: http://www.nps.gov/crla/index.htm

### Format Url
To see how the format-url capability works, try pasting the following link into a comment or description on a card: http://www.nps.gov/grca/index.htm

### Show Settings
To see how the show-settings capability works, try clicking the gear button next to the Power-Up in the Power-Ups menu.
