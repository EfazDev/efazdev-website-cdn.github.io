var latest_code = ""
var ready = true

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    try {
        const tabId = details.tabId;
        if (details.url.includes("https://www.roblox.com")) {
            const storage = chrome.storage.sync;
            storage.get(["verified_checkmark_settings"], function (items) {
                var enabled = false
                if (items["verified_checkmark_settings"]) {
                    enabled = items["verified_checkmark_settings"]["enabled"];
                } else {
                    enabled = true;
                }
                if (enabled == true) {
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