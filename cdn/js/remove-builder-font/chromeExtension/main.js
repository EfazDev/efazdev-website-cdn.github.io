/* 

Efaz's Builder Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

main.js:
    - Backup script incase of an error or timeout inside inject.js
    - Launches a Thank You page if first time use: [thank-you.html]

*/

var stored_css = ""
var stored_creator_dashboard_css = ""
var stored_devforum_css = ""
    
chrome.tabs.onUpdated.addListener(function (tabId, details, tab) {
    try {
        const storage = chrome.storage.sync;
        storage.get(["return_roblox_font_settings"], function (items) {
            var enabled = true;
            var remoteStyles = false;
            var overwriteCreateDashboard = true;
            var devForum = true;
            var otherSub = true;

            if (items["return_roblox_font_settings"]) {
                if (typeof (items["return_roblox_font_settings"]["enabled"]) == "boolean") { enabled = items["return_roblox_font_settings"]["enabled"] };
                if (typeof (items["return_roblox_font_settings"]["remoteStyles"]) == "boolean") { remoteStyles = items["return_roblox_font_settings"]["remoteStyles"] };
                if (typeof (items["return_roblox_font_settings"]["overwriteCreateDashboard"]) == "boolean") { overwriteCreateDashboard = items["return_roblox_font_settings"]["overwriteCreateDashboard"] };
                if (typeof (items["return_roblox_font_settings"]["overwriteDevForum"]) == "boolean") { devForum = items["return_roblox_font_settings"]["overwriteDevForum"] };
                if (typeof (items["return_roblox_font_settings"]["overwriteOtherSubdomains"]) == "boolean") { otherSub = items["return_roblox_font_settings"]["overwriteOtherSubdomains"] };
            }
            if (enabled == true) {
                if (tab.url) {
                    var urlObj = new URL(tab.url)
                    if (tab.url.startsWith("https://www.roblox.com")) {
                        if (remoteStyles == true) {
                            function injectCSS() {
                                if (document.getElementById("return-roblox-gotham") == null) {
                                    const style = document.createElement("link")
                                    style.id = "return-roblox-gotham";
                                    style.rel = "stylesheet";
                                    style.type = "text/css";
                                    style.media = "all";
                                    style.href = "https://cdn.efaz.dev/cdn/js/remove-builder-font/stored_css/change_font.css"
                                    document.head.append(style)
                                }
                            }
                            chrome.scripting.executeScript({
                                target: { tabId: tabId, allFrames: true },
                                func: injectCSS
                            })
                        } else {
                            function injectCSS(css) {
                                if (document.getElementById("return-roblox-gotham") == null) {
                                    if (css) {
                                        const style = document.createElement("style")
                                        style.id = "return-roblox-gotham";
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
                                fetch("change_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [fetched]
                                    })
                                })
                            }
                        }
                    } else if (tab.url.startsWith("https://devforum.roblox.com")) {
                        if (devForum == true) {
                            function injectCSS(css) {
                                if (document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)")) {
                                    document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)").href = ""
                                }
                                if (document.getElementById("return-roblox-gotham") == null) {
                                    if (css) {
                                        if (remoteStyles == true) {
                                            const style = document.createElement("link")
                                            style.id = "return-roblox-gotham";
                                            style.rel = "stylesheet";
                                            style.type = "text/css";
                                            style.media = "all";
                                            style.href = "https://cdn.efaz.dev/cdn/js/remove-builder-font/stored_css/devforum_font.css"
                                            document.head.append(style)
                                        } else {
                                            const style = document.createElement("style")
                                            style.id = "return-roblox-gotham";
                                            style.media = "all";
                                            style.innerHTML = css
                                            document.head.append(style)
                                        }
                                    }
                                }
                            }
                            if (stored_devforum_css) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabId, allFrames: true },
                                    func: injectCSS,
                                    args: [stored_devforum_css]
                                })
                            } else {
                                fetch("devforum_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_devforum_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [fetched]
                                    })
                                })
                            }
                        }
                    } else if (urlObj.hostname.includes(".roblox.com")) {
                        if ((overwriteCreateDashboard == true && urlObj.hostname.includes("create.roblox.com")) || (otherSub == true && !(urlObj.hostname.includes("create.roblox.com")))) {
                            function injectCSS(css, tries) {
                                if (css) {
                                    var new_tries = 0
                                    if (tries) {
                                        new_tries = tries
                                    }
                                    if (new_tries > 75) {
                                        return
                                    }
                                    if (document.querySelector("head > style:nth-child(1)")) {
                                        var selector = document.querySelector("head > style:nth-child(1)");
                                        if (selector.sheet.cssRules[7].cssText.includes("font-face")) {
                                            if (selector.innerHTML == "") {
                                                selector.innerHTML = css
                                            }
                                        } else {
                                            setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                        }
                                    } else {
                                        setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                    }
                                }
                            }
                            if (stored_creator_dashboard_css) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabId, allFrames: true },
                                    func: injectCSS,
                                    args: [stored_creator_dashboard_css]
                                })
                            } else {
                                fetch("global_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_creator_dashboard_css = fetched
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
    storage.get(["roblox_font_thanks"], async function (items) {
        if (items["roblox_font_thanks"]) {
            if (items["roblox_font_thanks"]["thanks"] == true) {
                console.log("System might have updated! GG!")
                return
            }
        }
        chrome.tabs.create({
            url: chrome.runtime.getURL("thank_you.css")
        })
        await storage.set({ "roblox_font_thanks": { "thanks": true } });
    });
});