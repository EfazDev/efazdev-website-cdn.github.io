/* 

Efaz's Builder Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

main.js:
    - Backup script incase of an error or timeout inside inject.js
    - Launches a Thank You page if first time use: [thank-you.html]

*/

var stored_css = "";
var stored_creator_dashboard_css = ""
var stored_devforum_css = ""

function overwriteResourcesUrl(css, trusted, ismain) {
    css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted)
    if (!(trusted == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) {
        if (ismain == true) {
            css = css.replaceAll("HCo Gotham SSm", "Builder")
        }
    }
    return css
}

chrome.tabs.onUpdated.addListener(function (tabId, details, tab) {
    try {
        const storage = chrome.storage.sync;
        storage.get(["removeBuilderFont"], function (items) {
            var enabled = true;
            var remoteStyles = false;
            var overwriteCreateDashboard = true;
            var devForum = true;
            var otherSub = true;
            var trusted_source = "https://cdn2.efaz.dev/cdn/remove-builder-font/"; /* This is customizable by the user, but they would have to find a fitting url and would have to view hidden options (for security). */

            if (items["removeBuilderFont"]) {
                if (typeof (items["removeBuilderFont"]["enabled"]) == "boolean") { enabled = items["removeBuilderFont"]["enabled"] };
                if (typeof (items["removeBuilderFont"]["remoteStyles"]) == "boolean") { remoteStyles = items["removeBuilderFont"]["remoteStyles"] };
                if (typeof (items["removeBuilderFont"]["overwriteCreateDashboard"]) == "boolean") { overwriteCreateDashboard = items["removeBuilderFont"]["overwriteCreateDashboard"] };
                if (typeof (items["removeBuilderFont"]["overwriteDevForum"]) == "boolean") { devForum = items["removeBuilderFont"]["overwriteDevForum"] };
                if (typeof (items["removeBuilderFont"]["overwriteOtherSubdomains"]) == "boolean") { otherSub = items["removeBuilderFont"]["overwriteOtherSubdomains"] };
                if (typeof (items["removeBuilderFont"]["resourcesUrl"]) == "string") { if (items["removeBuilderFont"]["resourcesUrl"] == "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/resources/") { items["removeBuilderFont"]["resourcesUrl"] = trusted_source; storage.set(items); } trusted_source = items["removeBuilderFont"]["resourcesUrl"] };
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
                                    style.href = "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/change_font.css"
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
                                    args: [overwriteResourcesUrl(stored_css, trusted_source, true)]
                                })
                            } else {
                                fetch("change_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [overwriteResourcesUrl(fetched, trusted_source, true)]
                                    })
                                })
                            }
                        }
                    } else if (tab.url.startsWith("https://devforum.roblox.com")) {
                        if (devForum == true) {
                            function injectCSS(css, remoteStyles) {
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
                                            style.href = "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/devforum_font.css"
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
                                    args: [overwriteResourcesUrl(stored_devforum_css, trusted_source), remoteStyles]
                                })
                            } else {
                                fetch("devforum_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_devforum_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [overwriteResourcesUrl(fetched, trusted_source), remoteStyles]
                                    })
                                })
                            }
                        }
                    } else if (tab.url.startsWith("https://create.roblox.com")) {
                        if (overwriteCreateDashboard == true) {
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
                                        var selectors = document.head.getElementsByTagName("style")
                                        var found = false
                                        for (q = 0; q < selectors.length; q++) {
                                            var selector = selectors[q]
                                            if (selector.getAttribute("data-emotion") == "web-blox-css-mui-global") {
                                                if (selector.innerHTML == "") {
                                                    selector.innerHTML = css
                                                    found = true
                                                }
                                            }
                                        }
                                        if (found == false) {
                                            setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                        }
                                    }
                                }
                            }
                            if (stored_creator_dashboard_css) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabId, allFrames: true },
                                    func: injectCSS,
                                    args: [overwriteResourcesUrl(stored_creator_dashboard_css, trusted_source)]
                                })
                            } else {
                                fetch("global_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_creator_dashboard_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [overwriteResourcesUrl(fetched, trusted_source)]
                                    })
                                })
                            }
                        }
                    } else if (urlObj.hostname.includes(".roblox.com")) {
                        if (otherSub == true && !(urlObj.hostname.includes("create.roblox.com"))) {
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
                                        var selectors = document.head.getElementsByTagName("style")
                                        var found = false
                                        for (q = 0; q < selectors.length; q++) {
                                            var selector = selectors[q]
                                            if (selector.getAttribute("data-emotion") == "web-blox-css-mui-global") {
                                                if (selector.innerHTML == "") {
                                                    selector.innerHTML = css
                                                    found = true
                                                }
                                            }
                                        }
                                        if (found == false) {
                                            setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                        }
                                    }
                                }
                            }
                            if (stored_creator_dashboard_css) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabId, allFrames: true },
                                    func: injectCSS,
                                    args: [overwriteResourcesUrl(stored_creator_dashboard_css, trusted_source)]
                                })
                            } else {
                                fetch("global_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_creator_dashboard_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [overwriteResourcesUrl(fetched, trusted_source)]
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
    fetch("settings.json").then(setting_res => {
        return setting_res.json()
    }).then(settings => {
        var name = settings["name"]
        storage.get([name], async function (items) {
            if (items[name]) {
                if (items[name]["thanks"] == true) {
                    console.log("The extension might have updated!")
                    return
                } else {
                    items[name]["thanks"] = true
                    chrome.tabs.create({
                        url: chrome.runtime.getURL("thank_you.html")
                    })
                    await storage.set(items);
                }
            }
        });
    })
})