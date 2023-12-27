const storage = chrome.storage.sync

async function saveData() {
    const formData = { "enabled": document.getElementById("enableExtension").checked, "color": document.getElementById("customColor").value, "groupsIncluded": document.getElementById("includeGroups").checked }
    await storage.set({ "verified_checkmark_settings": formData }, () => {
        alert("Saved data!")
    });
}

async function resetColorInput1() {
    document.getElementById("customColor").value = "#0066FF";
}

async function loadChanges(event) {
    storage.get(["verified_checkmark_settings"], function (items) {
        if (items["verified_checkmark_settings"]) {
            var settings = items["verified_checkmark_settings"];
            if (settings["enabled"]) { document.getElementById("enableExtension").checked = settings["enabled"] } else { document.getElementById("enableExtension").checked = true };
            if (settings["color"]) { document.getElementById("customColor").value = settings["color"] } else { document.getElementById("customColor").value = "#0066FF" };
            if (settings["groupsIncluded"]) { document.getElementById("includeGroups").checked = settings["groupsIncluded"] } else { document.getElementById("includeGroups").checked = false };
        } else {
            document.getElementById("enableExtension").checked = true;
            document.getElementById("customColor").value = "#0066FF";
            document.getElementById("includeGroups").checked = false;
        }
    });
    const submitButton = document.getElementById("submitbutton");
    submitButton.addEventListener("click", saveData);

    const resetColorButton = document.getElementById("resetcolorbutton");
    resetColorButton.addEventListener("click", resetColorInput1);
}

window.onload = function () {
    loadChanges()
}