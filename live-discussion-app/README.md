## Live Discussion Chat App Live Demo
- The live discussion chat app allows you to embed group/open channel into your web page for organizing live events or conferences.
- [Click here to view the live demo](https://demo.chatcamp.io/live-discussion-app/index.html?id=1)

## ChatCamp JavaScript Documentation
- You may review our documentation here - [https://docs.chatcamp.io/docs/javascript-chat-quickstart](https://docs.chatcamp.io/docs/javascript-chat-quickstart).

## How to Install ChatCamp UI Kit
We provide ready-to-use UI kit which may be integrated into your web app in three easy steps.

- First add the following div in your webpage: `<div class="cc-live-discussion-app" data-channel-id="CHANNEL_ID" data-channel-type="CHANNEL_TYPE" data-height="500px" data-width="100%"></div>`
- Next include the chat UI kit in footer: `<script src="https://cdn.chatcamp.io/js/chatcamp-ui.min.js"></script>`
- Finally we need to initialize the chat UI kit. Add the following code right after the above script tag:
```
      // Initialize ChatCamp
      window.ChatCampUi.init({
        appId: APP_ID, 
        user: {
          id: USER_ID,
          displayName: USER_DISPLAY_NAME // optional
          // accessToken: USER_ACCESS_TOKEN // optional
        }, 
        ui: {
          theme: {
            primaryBackground: "#3f45ad",
            primaryText: "#ffffff",
            secondaryBackground: "#ffffff",
            secondaryText: "#000000",
            tertiaryBackground: "#f4f7f9",
            tertiaryText: "#263238"
          },
          roster: {
            tabs: ['recent', 'rooms', 'users'], 
            render: true, 
            defaultMode: 'open' // other possible values are minimize, hidden
          }
        }
      })
```
Here `APP_ID`, `USER_ID`, `USER_DISPLAY_NAME`, `USER_ACCESS_TOKEN`, `CHANNEL_ID` and `CHANNEL_TYPE` should be replaced by correct string values and you are good to go. :)

The value of `CHANNEL_ID` you may get by using our [ChatCamp Dashboard](https://dashboard.chatcamp.io). And the value of `CHANNEL_TYPE` can be either `group` or `open` depending on if it is a group channel or open channel respectively. 

The Chat UI kit uses our ChatCamp JavaScript SDK to connect to our ChatCamp backend.
