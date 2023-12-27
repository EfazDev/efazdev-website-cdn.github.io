const storage = chrome.storage.sync

async function saveData() {
    const formData = { 
        "enabled": document.getElementById("enableExtension").checked, 
        "color": document.getElementById("customColor").value, 
        "groupsIncluded": document.getElementById("includeGroups").checked, 
        "allowedAlerts": document.getElementById("allowAlertMessages").checked 
    }
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
            if (settings["enabled"]) { document.getElementById("enableExtension").checked = true };
            if (settings["color"]) { document.getElementById("customColor").value = settings["color"] };
            if (settings["groupsIncluded"]) { document.getElementById("includeGroups").checked = true };
            if (settings["allowedAlerts"]) { document.getElementById("allowAlertMessages").checked = true };
        } else {
            document.getElementById("enableExtension").checked = true;
            document.getElementById("customColor").value = "#0066FF";
            document.getElementById("includeGroups").checked = false;
            document.getElementById("allowAlertMessages").checked = true;
        }
    });
    const submitButton = document.getElementById("submitbutton");
    submitButton.addEventListener("click", saveData);

    const resetColorButton = document.getElementById("resetcolorbutton");
    resetColorButton.addEventListener("click", resetColorInput1);

    fetch("manifest.json").then(man_res => {
        return man_res.json()
    }).then(man_json => {
        var extension_name = man_json["name"]
        var extension_version = man_json["version"]
        var extension_icon = man_json["icons"]["128"]

        document.getElementById("extens_name").innerHTML = `Extension Name: ${extension_name} ${`<img src="${extension_icon}" height="10" width="10">`}`
        document.getElementById("extens_vers").innerHTML = `v${extension_version}`
    })
}

window.onload = function () {
    loadChanges()
}