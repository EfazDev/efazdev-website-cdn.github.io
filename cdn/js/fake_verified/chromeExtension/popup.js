const storage = chrome.storage.sync

async function saveData() {
    const formData = {"enabled": document.getElementById("enableExtension").checked}
    await storage.set({"verified_checkmark_settings": formData}, () => {
        alert("Saved data!")
    });
}

async function loadChanges(event) {
    storage.get(["verified_checkmark_settings"], function (items) {
        if (items["verified_checkmark_settings"]) {
            var settings = items["verified_checkmark_settings"];
            document.getElementById("enableExtension").checked = settings["enabled"];
        } else {
            document.getElementById("enableExtension").checked = true;
        }
    });
    const submitButton = document.getElementById("submitbutton");
    submitButton.addEventListener("click", saveData);
}

window.onload = function() {
    loadChanges()
}