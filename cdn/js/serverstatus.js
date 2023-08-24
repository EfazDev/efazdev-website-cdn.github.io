var serverStatus = 1
var latest = new Date().getTime()
var countdown_total = 60
function updateObject() {
    var object = document.getElementById("status")
    if (serverStatus == 0) {
        object.innerHTML = "Current Status: 🟢 - Server Active - 0"
    } else if (serverStatus == 1) {
        object.innerHTML = "Current Status: 🟡 - Awaiting from server - 1"
    } else {
        object.innerHTML = "Current Status: 🔴 - Server Failed - 2"
    }
}
async function setTimer(time) {
    var inner = 'Updating in: ' + time + ' : <span><a href="/cdn/other/serverstatus.html">Update Now</a></span>'
    var object2 = document.getElementById("time")
    object2.innerHTML = inner
}
function setStatus(num) {
    serverStatus = num
    updateObject()
}
async function scan() {
    latest = new Date().getTime()
    setTimer(60)
    fetch("https://api.efaz.dev", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(new_json => {
            if (new_json["success"] == true) {
                setStatus(0)
            } else {
                setStatus(2)
            }
        }).catch(err => {
            setStatus(2)
            console.warn(err)
        })
}
async function main() {
    setStatus(1)
    await scan()
    setTimeout(() => { main(); }, countdown_total * 1000);
}
var update = setInterval(function () {
    var now = new Date().getTime();
    var diff = now - latest;
    var seconds = Math.round(diff / 1000)
    setTimer(countdown_total - seconds)
}, 1000);
window.onload = main