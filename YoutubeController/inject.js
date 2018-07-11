(function () {
})();
function Pause() {
    document.getElementsByClassName('html5-video-player')[0].click()
}
function Next() {
    document.getElementsByClassName('ytp-next-button ytp-button')[0].click()
}
function Mute() {
    document.getElementsByClassName('ytp-mute-button ytp-button')[0].click()
}
function Back() {
    window.history.back();
}
function control(t) {
    switch (t) {
        case "play":
            document.getElementsByClassName('html5-video-player')[0].click();
            break;
        case "next":
            document.getElementsByClassName('ytp-next-button ytp-button')[0].click();
            break;
        case "back":
            window.history.back();
            break;
        case "mute":
            document.getElementsByClassName('ytp-mute-button ytp-button')[0].click();
            break;
        default:
            break;
    }
}
var s = ":!232142";
/*Add Meta to head*/
var meta = document.createElement('meta');
meta.httpEquiv = "Content-Security-Policy";
meta.content = "upgrade-insecure-requests";
document.getElementsByTagName('head')[0].appendChild(meta);
/**********************************/

/*Add script source to head */
var script = document.createElement("script"); // Make a script DOM node
script.src = 'https://192.168.1.4/socket.io/socket.io.js';
document.head.appendChild(script);
/**********************/
/*Add script source to head */
var script = document.createElement("script"); // Make a script DOM node
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
document.head.appendChild(script);
/**********************/

/*Append script to body*/
// var script = document.createElement("script"); // Make a script DOM node
// script.type = 'text/javascript';
// script.innerHTML = `var socket = io.connect('https://192.168.1.4:3000',{"transports":['websocket', 'polling']});socket.on("connect", function () {console.log("Connected.");});socket.on("msg", function (d) {console.log(d)});`
// document.body.appendChild(script);
/******************************/

// var socket = io.connect('https://192.168.1.4:3000',{"transports":['websocket', 'polling']});
// socket.on("connect", function () {
//     console.log("Connected.");
// });
// socket.emit("send","hello");
// socket.on("msg", function (d) {
//  console.log(d)
// });

//<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">