/*Append script to body*/
var script = document.createElement("script"); // Make a script DOM node
script.type = 'text/javascript';
script.innerHTML = `var socket = io.connect('https://192.168.1.4:443',{"transports":['websocket', 'polling']});
changetitle()
function control(t) {
    switch (t) {
        case "play":
            document.getElementsByClassName('html5-video-player')[0].click();
            break;
        case "next":
            document.getElementsByClassName('ytp-next-button ytp-button')[0].click();
            changetitle();
            break;
        case "back":
            window.history.back();
            changetitle();
            break;
        default:
            break;
    }
}
function changetitle(){
    setTimeout(() => {
        socket.emit("title", document.title);
        socket.emit("nextsong",document.getElementById("video-title").innerText);
        a = document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer");
        list=[];
        for (i = 4; i < a.length-2; i++) {
            console.log(a[i].getElementsByTagName('a')[0].href,a[i].getElementsByTagName('span')[1].innerText);
            list.push({name:a[i].getElementsByTagName('span')[1].innerText,link:a[i].getElementsByTagName('a')[0].href});
        }
        console.log(list);
        socket.emit("songlist",list);
    }, 2000);
}
document.getElementsByClassName("video-stream html5-main-video")[0].addEventListener("play", function(){changetitle();console.log("The video has started to play");});
socket.on("connect", function () {console.log("Connected.");});socket.on("msg", function (d) {control(d);console.log(d)});socket.on("sendlink",function(link){window.location.href = link;})`
a = document.body.getElementsByTagName("script");
c = true;
for (i = 0; i < a.length; i++) {
    if (a[i].type.includes("text") && a[i].innerHTML.includes("192.168")) {
        c = false;
        console.log("script already inject");
    }
}
if (c) document.body.appendChild(script);
/******************************/
/*a = document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer")
list = []
j = 0;
if (a[4].getElementsByTagName('span')[j].innerText.includes(':')) {
    j = 1;
}
for (i = 4; i < a.length - 2; i++) {
    console.log(a[i].getElementsByTagName('a')[0].href, a[i].getElementsByTagName('span')[1].innerText);
    list.push({ name: a[i].getElementsByTagName('span')[j].innerText, link: a[i].getElementsByTagName('a')[0].href });
}
console.log(list);*/