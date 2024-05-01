/* 

Efaz's Roblox Theme
By: EfazDev
Page: https://www.efaz.dev/

main.js:
    - Backup script incase of an error or timeout inside inject.js
    - Launches a Thank You page if first time use: [https://www.efaz.dev/thanks]

*/

var stored_css = ""
    
chrome.tabs.onUpdated.addListener(function (tabId, details, tab) {
    try {
        const storage = chrome.storage.sync;
        storage.get(["return_efaz_theme_settings"], function (items) {
            var enabled = true;
            var remoteStyles = false;

            if (items["return_efaz_theme_settings"]) {
                if (typeof (items["return_efaz_theme_settings"]["enabled"]) == "boolean") { enabled = items["return_efaz_theme_settings"]["enabled"] };
                if (typeof (items["return_efaz_theme_settings"]["remoteStyles"]) == "boolean") { remoteStyles = items["return_efaz_theme_settings"]["remoteStyles"] };
            }
            if (enabled == true) {
                if (tab.url) {
                    if (tab.url.startsWith("https://www.roblox.com")) {
                        if (remoteStyles == true) {
                            function injectCSS() {
                                if (document.getElementById("efaz-theme") == null) {
                                    const style = document.createElement("link")
                                    style.id = "efaz-theme";
                                    style.rel = "stylesheet";
                                    style.type = "text/css";
                                    style.media = "all";
                                    style.href = "https://cdn.efaz.dev/cdn/extensions/efaz-roblox-theme/chromeExtension/theme.css"
                                    document.head.append(style)
                                }
                            }
                            chrome.scripting.executeScript({
                                target: { tabId: tabId, allFrames: true },
                                func: injectCSS
                            })
                        } else {
                            function injectCSS(css) {
                                if (document.getElementById("efaz-theme") == null) {
                                    if (css) {
                                        const style = document.createElement("style")
                                        style.id = "efaz-theme";
                                        style.media = "all";
                                        style.innerHTML = css
                                        document.head.append(style)
                                    }
                                }
                            }
                            if (stored_css) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabId, allFrames: true },
                                    func: injectCSS,
                                    args: [stored_css]
                                })
                            } else {
                                fetch("theme.css").then(res => { return res.text() }).then(fetched => {
                                    stored_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [fetched]
                                    })
                                })
                            }
                        }
                    }
                }
            }
        });
    } catch (err) {
        console.log("Failed to add font settings to this tab.")
    }
});

chrome.runtime.onInstalled.addListener(() => {
    const storage = chrome.storage.sync;
    storage.get(["efaz_theme_thanks"], async function (items) {
        if (items["efaz_theme_thanks"]) {
            if (items["efaz_theme_thanks"]["thanks"] == true) {
                console.log("System might have updated! GG!")
                return
            }
        }
        chrome.tabs.create({
            url: "https://www.efaz.dev/thanks"
        })
        await storage.set({ "efaz_theme_thanks": { "thanks": true } });
    });
});