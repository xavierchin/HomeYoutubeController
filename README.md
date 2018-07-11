"# HomeYoutubeController" 
    This is just for windows and Local internet use for control your Google Chrome Youtube website song.

# Install
1.  Install Google Chrome Extension.
    -   Open your Google Chrome chrome://extensions/.
    -   Enable Developer Mode by clicking the toggle switch next to Developer mode.
    -   Click the LOAD UNPACKED button and select the extension directory.
    -   Extension install complete.

2.  Setup server.
    -   Open Command Prompt switch location to folder HomeYoutubeContorller.
    -   Execute `npm install` to install all needed module.
    -   Open `https.js` and `index.html`  change the ip '192.168.1.4' to your Local IP address.
    -   You need to use openssl to create `server-key.pem` `server-cert.pem` `cert.pem` to the folder `key` under folder same `https.js`.
    -   Server Setup complete.

3. Now you can start to use HomeYoutubeController.
    -   Use Google Chrome open any youtube song.
    -   Open `http://yourIP/` at any compute or smartphone browser,but need to add exception about `https://yourIP` certificate.
    -   let's start.
    
