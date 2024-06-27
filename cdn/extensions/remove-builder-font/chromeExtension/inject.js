/* 

Efaz's Builder Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

inject.js:
    - Content script that injects a stylesheet to remove the builder font

*/

(function () { // Prevent changes made using the Inspect console.
    const storage = chrome.storage.sync;
    var stored_css = ""
    var stored_creator_dashboard_css = ""
    var stored_devforum_css = ""

    function overwriteResourcesUrl(made_css, source) {
        if (!(source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) {
            var font_locations = {
                "Light": {
                    "woff": "https://css.rbxcdn.com/5c779fadf28d7893108d5b896e092e0d-GothamSSm-Light.woff",
                    "woff2": "https://css.rbxcdn.com/38e00f7de6f417aa3a458560a15e2b8a-GothamSSm-Light.woff2"
                },
                "Book": {
                    "woff": "https://css.rbxcdn.com/713e0b3a604ff4e44f55f9d1c100e8b5-GothamSSm-Book.woff",
                    "woff2": "https://css.rbxcdn.com/6eafc48312528e2515d622428b6b95cc-GothamSSm-Book.woff2"
                },
                "Medium": {
                    "woff": "https://css.rbxcdn.com/2ed7693f8cf4d79466dd604c35502f76-GothamSSm-Medium.woff",
                    "woff2": "https://css.rbxcdn.com/66d562e3299ee732a53db150038c026e-GothamSSm-Medium.woff2"
                },
                "Bold": {
                    "woff": "https://css.rbxcdn.com/fe0e9885efc341b17f7e600781493f69-GothamSSm-Bold.woff",
                    "woff2": "https://css.rbxcdn.com/3c102ace52ea35b16da4383819acfa38-GothamSSm-Bold.woff2"
                },
                "Black": {
                    "woff": "https://css.rbxcdn.com/3ac436cddb043616a4059aa6fe3b0c0a-GothamSSm-Black.woff",
                    "woff2": "https://css.rbxcdn.com/0acd8ff34f3a5c177d02e9011ee74eb3-GothamSSm-Black.woff2"
                },
                "Mono": {
                    "woff": "https://fonts.roblox.com/firamono/FiraMono-Regular.woff",
                    "woff2": "https://fonts.roblox.com/firamono/FiraMono-Regular.woff2"
                }
            }
            if (!(source.endsWith("/"))) {
                source = `${source}/`
            }
            made_css = made_css.replaceAll(font_locations["Black"]["woff"], `${source}Black.woff`)
            made_css = made_css.replaceAll(font_locations["Black"]["woff2"], `${source}Black.woff2`)

            made_css = made_css.replaceAll(font_locations["Light"]["woff"], `${source}Light.woff`)
            made_css = made_css.replaceAll(font_locations["Light"]["woff2"], `${source}Light.woff2`)

            made_css = made_css.replaceAll(font_locations["Book"]["woff"], `${source}Book.woff`)
            made_css = made_css.replaceAll(font_locations["Book"]["woff2"], `${source}Book.woff2`)

            made_css = made_css.replaceAll(font_locations["Medium"]["woff"], `${source}Medium.woff`)
            made_css = made_css.replaceAll(font_locations["Medium"]["woff2"], `${source}Medium.woff2`)

            made_css = made_css.replaceAll(font_locations["Bold"]["woff"], `${source}Bold.woff`)
            made_css = made_css.replaceAll(font_locations["Bold"]["woff2"], `${source}Bold.woff2`)

            made_css = made_css.replaceAll(font_locations["Mono"]["woff"], `${source}Mono.woff`)
            made_css = made_css.replaceAll(font_locations["Mono"]["woff2"], `${source}Mono.woff2`)
            return made_css
        } else {
            return made_css
        }
    }

    try {
        storage.get(["removeBuilderFont"], function (items) {
            var enabled = true;
            var remoteStyles = false;
            var overwriteCreateDashboard = true;
            var devForum = true;
            var otherSub = true;
            var trusted_source = "https://cdn2.efaz.dev/cdn/remove-builder-font/"; /* This is customizable by the user, but they would have to find a fitting url and make sure it's trusted. */

            if (items["removeBuilderFont"]) {
                if (typeof (items["removeBuilderFont"]["enabled"]) == "boolean") { enabled = items["removeBuilderFont"]["enabled"] };
                if (typeof (items["removeBuilderFont"]["remoteStyles"]) == "boolean") { remoteStyles = items["removeBuilderFont"]["remoteStyles"] };
                if (typeof (items["removeBuilderFont"]["overwriteCreateDashboard"]) == "boolean") { overwriteCreateDashboard = items["removeBuilderFont"]["overwriteCreateDashboard"] };
                if (typeof (items["removeBuilderFont"]["overwriteDevForum"]) == "boolean") { devForum = items["removeBuilderFont"]["overwriteDevForum"] };
                if (typeof (items["removeBuilderFont"]["overwriteOtherSubdomains"]) == "boolean") { otherSub = items["removeBuilderFont"]["overwriteOtherSubdomains"] };
                if (typeof (items["removeBuilderFont"]["resourcesUrl"]) == "string") { if (items["removeBuilderFont"]["resourcesUrl"] == "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/resources/") { items["removeBuilderFont"]["resourcesUrl"] = trusted_source; storage.set(items); } trusted_source = items["removeBuilderFont"]["resourcesUrl"] };
            }
            if (enabled == true) {
                var tab = window.location
                if (tab.href) {
                    var urlObj = window.location
                    if (urlObj.hostname == "www.roblox.com") {
                        function injectCSS(css) {
                            if (document.getElementById("remove-builder-font") == null) {
                                if (css) {
                                    const style = document.createElement("style")
                                    style.id = "remove-builder-font";
                                    style.media = "all";
                                    style.innerHTML = css
                                    document.head.append(style)
                                }
                            }
                        }
                        if (stored_css) {
                            injectCSS(overwriteResourcesUrl(stored_css, trusted_source))
                        } else {
                            if (remoteStyles == true) {
                                fetch("https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/change_font.css").then(res => { return res.text() }).then(fetched => {
                                    stored_css = fetched
                                    injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                })
                            } else {
                                fetch(chrome.runtime.getURL("change_font.css")).then(res => { return res.text() }).then(fetched => {
                                    stored_css = fetched
                                    injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                })
                            }
                        }
                    } else if (urlObj.hostname == "devforum.roblox.com") {
                        if (devForum == true) {
                            function injectCSS(css, tries) {
                                if (css) {
                                    var new_tries = 0
                                    if (tries) {
                                        new_tries = tries
                                    }
                                    if (document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)")) {
                                        var selector = document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)");
                                        if (selector.href.includes("devforum.roblox.com")) {
                                            selector.remove()
                                            if (css) {
                                                const style = document.createElement("style")
                                                style.id = "remove-builder-font";
                                                style.media = "all";
                                                style.innerHTML = css
                                                document.head.append(style)
                                            }
                                        } else {
                                            setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                        }
                                    } else {
                                        var observer = new MutationObserver(function (m) {
                                            if (document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)")) {
                                                injectCSS(css, new_tries + 1)
                                            }
                                        });
                                        observer.observe(document.head, { childList: true });
                                    }
                                }
                            }
                            if (stored_devforum_css) {
                                injectCSS(overwriteResourcesUrl(stored_devforum_css, trusted_source))
                            } else {
                                if (remoteStyles == true) {
                                    fetch("https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/devforum_font.css").then(res => { return res.text() }).then(fetched => {
                                        stored_devforum_css = fetched
                                        injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                    })
                                } else {
                                    fetch(chrome.runtime.getURL("devforum_font.css")).then(res => { return res.text() }).then(fetched => {
                                        stored_devforum_css = fetched
                                        injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                    })
                                }
                            }
                        }
                    } else if (urlObj.hostname == "create.roblox.com") {
                        if (overwriteCreateDashboard == true) {
                            function injectCSS(css, tries) {
                                if (css) {
                                    var new_tries = 0
                                    if (tries) {
                                        new_tries = tries
                                    }
                                    if (!(trusted_source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) { css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted_source); }
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
                                injectCSS(overwriteResourcesUrl(stored_creator_dashboard_css, trusted_source))
                            } else {
                                if (remoteStyles == true) {
                                    fetch("https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/global_font.css").then(res => { return res.text() }).then(fetched => {
                                        stored_creator_dashboard_css = fetched
                                        injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                    })
                                } else {
                                    fetch(chrome.runtime.getURL("global_font.css")).then(res => { return res.text() }).then(fetched => {
                                        stored_creator_dashboard_css = fetched
                                        injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                    })
                                }
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
                                    if (!(trusted_source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) { css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted_source); }
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
                                injectCSS(overwriteResourcesUrl(stored_creator_dashboard_css, trusted_source))
                            } else {
                                if (remoteStyles == true) {
                                    fetch("https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/global_font.css").then(res => { return res.text() }).then(fetched => {
                                        stored_creator_dashboard_css = fetched
                                        injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                    })
                                } else {
                                    fetch(chrome.runtime.getURL("global_font.css")).then(res => { return res.text() }).then(fetched => {
                                        stored_creator_dashboard_css = fetched
                                        injectCSS(overwriteResourcesUrl(fetched, trusted_source))
                                    })
                                }
                            }
                        }
                    }
                }
            }
        });
    } catch (err) {
        console.warn(`Failed to insert font styles into this tab. Error Message: ${err.message}`)
    }
}())