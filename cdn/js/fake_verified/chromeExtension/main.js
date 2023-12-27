var latest_code = ""
var ready = true

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    try {
        const tabId = details.tabId;
        if (details.url.includes("https://www.roblox.com")) {
            const storage = chrome.storage.sync;
            storage.get(["verified_checkmark_settings"], function (items) {
                var enabled = false
                var custom_color = "#0066FF"
                var group_included = false
                if (items["verified_checkmark_settings"]) {
                    if (items["verified_checkmark_settings"]["enabled"]) { enabled = items["verified_checkmark_settings"]["enabled"] };
                    if (items["verified_checkmark_settings"]["color"]) { custom_color = items["verified_checkmark_settings"]["color"] };
                    if (items["verified_checkmark_settings"]["groupsIncluded"]) { group_included = items["verified_checkmark_settings"]["groupsIncluded"] };
                } else {
                    enabled = true;
                    custom_color = "#0066FF"    
                    group_included = false
                }
                if (enabled == true) {
                    function setVerifiedSettings(data) {
                        window.verifiedCheckmarkSettings = data
                    }
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: setVerifiedSettings,
                        args : [ {"enabled": enabled, "color": custom_color, "groupsIncluded": group_included} ]
                    });

                    if (ready == true) {
                        fetch("javascript_to_run.js").then(res => {
                            return res.text()
                        }).then(code => {
                            ready = false
                            chrome.scripting.executeScript({
                                target: { tabId: tabId, allFrames: true },
                                files: ["javascript_to_run.js"],
                            });
                        }).catch(err => {
                            ready = true
                            console.error(`Error while getting code from system! ${err.message}`)
                        })
                    } else {
                        chrome.scripting.executeScript({
                            target: { tabId: tabId, allFrames: true },
                            files: ["javascript_to_run.js"],
                        });
                    }
                }
            });
        }
    } catch (err) {
        console.log("Failed to add verified badge to this tab.")
    }
});