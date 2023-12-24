(function () {
    var enabled = true;
    var allow_messages = true;
    if (enabled) {
        function getIfVerified() {
            return document.querySelector("meta[name='user-data']").getAttribute("data-hasverifiedbadge") == "true";
        }
        if (getIfVerified() == true) {
            if (allow_messages) alert("You already applied the verified badge effect on this page!");
        } else {
            if (window.location.host == "www.roblox.com") {
                async function getUserData() {
                    return fetch("https://users.roblox.com/v1/users/authenticated", {
                        "headers": {
                            "accept": "application/json",
                            "accept-language": "en-US,en;q=0.9",
                            "cache-control": "no-cache",
                            "pragma": "no-cache",
                            "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"macOS\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin"
                        },
                        "referrer": "https://users.roblox.com/docs/index.html",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": null,
                        "method": "GET",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(res => {
                        return res.json()
                    });
                }
                function getIfVerified() {
                    return window.set_verified == true;
                }
                if (getIfVerified() == true) {
                    if (allow_messages) alert("You already applied the verified badge effect on this page!");
                } else {
                    var profile_html = atob("PHNwYW4gcm9sZT0iYnV0dG9uIiB0YWJpbmRleD0iMCIgZGF0YS1yYmx4LXZlcmlmaWVkLWJhZGdlLWljb249IiIgZGF0YS1yYmx4LWJhZGdlLWljb249InRydWUiIGNsYXNzPSJqc3MxNiI+PGltZyBjbGFzcz0icHJvZmlsZS12ZXJpZmllZC1iYWRnZS1pY29uIiBzcmM9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyOCcgaGVpZ2h0PScyOCcgdmlld0JveD0nMCAwIDI4IDI4JyBmaWxsPSdub25lJyUzRSUzQ2cgY2xpcC1wYXRoPSd1cmwoJTIzY2xpcDBfOF80NiknJTNFJTNDcmVjdCB4PSc1Ljg4ODE4JyB3aWR0aD0nMjIuODknIGhlaWdodD0nMjIuODknIHRyYW5zZm9ybT0ncm90YXRlKDE1IDUuODg4MTggMCknIGZpbGw9JyUyMzAwNjZGRicvJTNFJTNDcGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGNsaXAtcnVsZT0nZXZlbm9kZCcgZD0nTTIwLjU0MyA4Ljc1MDhMMjAuNTQ5IDguNzU2OEMyMS4xNSA5LjM1NzggMjEuMTUgMTAuMzMxOCAyMC41NDkgMTAuOTMyOEwxMS44MTcgMTkuNjY0OEw3LjQ1IDE1LjI5NjhDNi44NSAxNC42OTU4IDYuODUgMTMuNzIxOCA3LjQ1IDEzLjEyMThMNy40NTcgMTMuMTE0OEM4LjA1OCAxMi41MTM4IDkuMDMxIDEyLjUxMzggOS42MzMgMTMuMTE0OEwxMS44MTcgMTUuMjk5OEwxOC4zNjcgOC43NTA4QzE4Ljk2OCA4LjE0OTggMTkuOTQyIDguMTQ5OCAyMC41NDMgOC43NTA4WicgZmlsbD0nd2hpdGUnLyUzRSUzQy9nJTNFJTNDZGVmcyUzRSUzQ2NsaXBQYXRoIGlkPSdjbGlwMF84XzQ2JyUzRSUzQ3JlY3Qgd2lkdGg9JzI4JyBoZWlnaHQ9JzI4JyBmaWxsPSd3aGl0ZScvJTNFJTNDL2NsaXBQYXRoJTNFJTNDL2RlZnMlM0UlM0Mvc3ZnJTNFIiB0aXRsZT0iMTg2MTc2NDAiIGFsdD0iMTg2MTc2NDAiPjwvc3Bhbj4=");
                    var name_html = atob("PGltZyBjbGFzcz0idmVyaWZpZWQtYmFkZ2UtaWNvbi1jYXRhbG9nLWl0ZW0tcmVuZGVyZWQiIHNyYz0iZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzI4JyBoZWlnaHQ9JzI4JyB2aWV3Qm94PScwIDAgMjggMjgnIGZpbGw9J25vbmUnJTNFJTNDZyBjbGlwLXBhdGg9J3VybCglMjNjbGlwMF84XzQ2KSclM0UlM0NyZWN0IHg9JzUuODg4MTgnIHdpZHRoPScyMi44OScgaGVpZ2h0PScyMi44OScgdHJhbnNmb3JtPSdyb3RhdGUoMTUgNS44ODgxOCAwKScgZmlsbD0nJTIzMDA2NkZGJy8lM0UlM0NwYXRoIGZpbGwtcnVsZT0nZXZlbm9kZCcgY2xpcC1ydWxlPSdldmVub2RkJyBkPSdNMjAuNTQzIDguNzUwOEwyMC41NDkgOC43NTY4QzIxLjE1IDkuMzU3OCAyMS4xNSAxMC4zMzE4IDIwLjU0OSAxMC45MzI4TDExLjgxNyAxOS42NjQ4TDcuNDUgMTUuMjk2OEM2Ljg1IDE0LjY5NTggNi44NSAxMy43MjE4IDcuNDUgMTMuMTIxOEw3LjQ1NyAxMy4xMTQ4QzguMDU4IDEyLjUxMzggOS4wMzEgMTIuNTEzOCA5LjYzMyAxMy4xMTQ4TDExLjgxNyAxNS4yOTk4TDE4LjM2NyA4Ljc1MDhDMTguOTY4IDguMTQ5OCAxOS45NDIgOC4xNDk4IDIwLjU0MyA4Ljc1MDhaJyBmaWxsPSd3aGl0ZScvJTNFJTNDL2clM0UlM0NkZWZzJTNFJTNDY2xpcFBhdGggaWQ9J2NsaXAwXzhfNDYnJTNFJTNDcmVjdCB3aWR0aD0nMjgnIGhlaWdodD0nMjgnIGZpbGw9J3doaXRlJy8lM0UlM0MvY2xpcFBhdGglM0UlM0MvZGVmcyUzRSUzQy9zdmclM0UiIHRpdGxlPSJWZXJpZmllZCBCYWRnZSBJY29uIiBhbHQ9IlZlcmlmaWVkIEJhZGdlIEljb24iPg==");
                    var name_html_larger = atob("PHNwYW4gcm9sZT0iYnV0dG9uIiB0YWJpbmRleD0iMCIgZGF0YS1yYmx4LXZlcmlmaWVkLWJhZGdlLWljb249IiIgZGF0YS1yYmx4LWJhZGdlLWljb249InRydWUiIGNsYXNzPSJqc3MyOTIiPjxpbWcgY2xhc3M9InZlcmlmaWVkLWJhZGdlLWljb24tZ3JvdXAtc2hvdXQtcmVuZGVyZWQiIHNyYz0iZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzI4JyBoZWlnaHQ9JzI4JyB2aWV3Qm94PScwIDAgMjggMjgnIGZpbGw9J25vbmUnJTNFJTNDZyBjbGlwLXBhdGg9J3VybCglMjNjbGlwMF84XzQ2KSclM0UlM0NyZWN0IHg9JzUuODg4MTgnIHdpZHRoPScyMi44OScgaGVpZ2h0PScyMi44OScgdHJhbnNmb3JtPSdyb3RhdGUoMTUgNS44ODgxOCAwKScgZmlsbD0nJTIzMDA2NkZGJy8lM0UlM0NwYXRoIGZpbGwtcnVsZT0nZXZlbm9kZCcgY2xpcC1ydWxlPSdldmVub2RkJyBkPSdNMjAuNTQzIDguNzUwOEwyMC41NDkgOC43NTY4QzIxLjE1IDkuMzU3OCAyMS4xNSAxMC4zMzE4IDIwLjU0OSAxMC45MzI4TDExLjgxNyAxOS42NjQ4TDcuNDUgMTUuMjk2OEM2Ljg1IDE0LjY5NTggNi44NSAxMy43MjE4IDcuNDUgMTMuMTIxOEw3LjQ1NyAxMy4xMTQ4QzguMDU4IDEyLjUxMzggOS4wMzEgMTIuNTEzOCA5LjYzMyAxMy4xMTQ4TDExLjgxNyAxNS4yOTk4TDE4LjM2NyA4Ljc1MDhDMTguOTY4IDguMTQ5OCAxOS45NDIgOC4xNDk4IDIwLjU0MyA4Ljc1MDhaJyBmaWxsPSd3aGl0ZScvJTNFJTNDL2clM0UlM0NkZWZzJTNFJTNDY2xpcFBhdGggaWQ9J2NsaXAwXzhfNDYnJTNFJTNDcmVjdCB3aWR0aD0nMjgnIGhlaWdodD0nMjgnIGZpbGw9J3doaXRlJy8lM0UlM0MvY2xpcFBhdGglM0UlM0MvZGVmcyUzRSUzQy9zdmclM0UiIHRpdGxlPSJWZXJpZmllZCBCYWRnZSBJY29uIiBhbHQ9IlZlcmlmaWVkIEJhZGdlIEljb24iPjwvc3Bhbj4=");
                    var name_side_html = atob("PGltZyBzcmM9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyOCcgaGVpZ2h0PScyOCcgdmlld0JveD0nMCAwIDI4IDI4JyBmaWxsPSdub25lJyUzRSUzQ2cgY2xpcC1wYXRoPSd1cmwoJTIzY2xpcDBfOF80NiknJTNFJTNDcmVjdCB4PSc1Ljg4ODE4JyB3aWR0aD0nMjIuODknIGhlaWdodD0nMjIuODknIHRyYW5zZm9ybT0ncm90YXRlKDE1IDUuODg4MTggMCknIGZpbGw9JyUyMzAwNjZGRicvJTNFJTNDcGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGNsaXAtcnVsZT0nZXZlbm9kZCcgZD0nTTIwLjU0MyA4Ljc1MDhMMjAuNTQ5IDguNzU2OEMyMS4xNSA5LjM1NzggMjEuMTUgMTAuMzMxOCAyMC41NDkgMTAuOTMyOEwxMS44MTcgMTkuNjY0OEw3LjQ1IDE1LjI5NjhDNi44NSAxNC42OTU4IDYuODUgMTMuNzIxOCA3LjQ1IDEzLjEyMThMNy40NTcgMTMuMTE0OEM4LjA1OCAxMi41MTM4IDkuMDMxIDEyLjUxMzggOS42MzMgMTMuMTE0OEwxMS44MTcgMTUuMjk5OEwxOC4zNjcgOC43NTA4QzE4Ljk2OCA4LjE0OTggMTkuOTQyIDguMTQ5OCAyMC41NDMgOC43NTA4WicgZmlsbD0nd2hpdGUnLyUzRSUzQy9nJTNFJTNDZGVmcyUzRSUzQ2NsaXBQYXRoIGlkPSdjbGlwMF84XzQ2JyUzRSUzQ3JlY3Qgd2lkdGg9JzI4JyBoZWlnaHQ9JzI4JyBmaWxsPSd3aGl0ZScvJTNFJTNDL2NsaXBQYXRoJTNFJTNDL2RlZnMlM0UlM0Mvc3ZnJTNFIiB0aXRsZT0iVmVyaWZpZWQgQmFkZ2UgSWNvbiIgYWx0PSJWZXJpZmllZCBCYWRnZSBJY29uIiBzdHlsZT0ibWFyZ2luLWxlZnQ6IDJweDt3aWR0aDogMTJweDtoZWlnaHQ6IDEycHg7IGJhY2tncm91bmQ6IG5vbmUgIWltcG9ydGFudDsiPg==");
                    var game_html = atob("PHNwYW4gcm9sZT0iYnV0dG9uIiB0YWJpbmRleD0iMCIgZGF0YS1yYmx4LXZlcmlmaWVkLWJhZGdlLWljb249IiIgZGF0YS1yYmx4LWJhZGdlLWljb249InRydWUiIGNsYXNzPSJqc3M0Ij48aW1nIGNsYXNzPSJ2ZXJpZmllZC1iYWRnZS1pY29uLWV4cGVyaWVuY2UtY3JlYXRvciIgc3R5bGU9Im1hcmdpbi1sZWZ0OiA0cHg7d2lkdGg6IDE2cHg7aGVpZ2h0OiAxNnB4OyIgc3JjPSJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMjgnIGhlaWdodD0nMjgnIHZpZXdCb3g9JzAgMCAyOCAyOCcgZmlsbD0nbm9uZSclM0UlM0NnIGNsaXAtcGF0aD0ndXJsKCUyM2NsaXAwXzhfNDYpJyUzRSUzQ3JlY3QgeD0nNS44ODgxOCcgd2lkdGg9JzIyLjg5JyBoZWlnaHQ9JzIyLjg5JyB0cmFuc2Zvcm09J3JvdGF0ZSgxNSA1Ljg4ODE4IDApJyBmaWxsPSclMjMwMDY2RkYnLyUzRSUzQ3BhdGggZmlsbC1ydWxlPSdldmVub2RkJyBjbGlwLXJ1bGU9J2V2ZW5vZGQnIGQ9J00yMC41NDMgOC43NTA4TDIwLjU0OSA4Ljc1NjhDMjEuMTUgOS4zNTc4IDIxLjE1IDEwLjMzMTggMjAuNTQ5IDEwLjkzMjhMMTEuODE3IDE5LjY2NDhMNy40NSAxNS4yOTY4QzYuODUgMTQuNjk1OCA2Ljg1IDEzLjcyMTggNy40NSAxMy4xMjE4TDcuNDU3IDEzLjExNDhDOC4wNTggMTIuNTEzOCA5LjAzMSAxMi41MTM4IDkuNjMzIDEzLjExNDhMMTEuODE3IDE1LjI5OThMMTguMzY3IDguNzUwOEMxOC45NjggOC4xNDk4IDE5Ljk0MiA4LjE0OTggMjAuNTQzIDguNzUwOFonIGZpbGw9J3doaXRlJy8lM0UlM0MvZyUzRSUzQ2RlZnMlM0UlM0NjbGlwUGF0aCBpZD0nY2xpcDBfOF80NiclM0UlM0NyZWN0IHdpZHRoPScyOCcgaGVpZ2h0PScyOCcgZmlsbD0nd2hpdGUnLyUzRSUzQy9jbGlwUGF0aCUzRSUzQy9kZWZzJTNFJTNDL3N2ZyUzRSIgdGl0bGU9IlZlcmlmaWVkIEJhZGdlIEljb24iIGFsdD0iVmVyaWZpZWQgQmFkZ2UgSWNvbiI+PC9zcGFuPg==");
                    var name_small_html = atob("PHNwYW4+PHNwYW4gcm9sZT0iYnV0dG9uIiB0YWJpbmRleD0iMCIgZGF0YS1yYmx4LXZlcmlmaWVkLWJhZGdlLWljb249IiIgZGF0YS1yYmx4LWJhZGdlLWljb249InRydWUiIGNsYXNzPSJqc3MyMiI+PGltZyBjbGFzcz0idmVyaWZpZWQtYmFkZ2UtaWNvbi1tZW1iZXItY2FyZC1yZW5kZXJlZCIgc3JjPSJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMjgnIGhlaWdodD0nMjgnIHZpZXdCb3g9JzAgMCAyOCAyOCcgZmlsbD0nbm9uZSclM0UlM0NnIGNsaXAtcGF0aD0ndXJsKCUyM2NsaXAwXzhfNDYpJyUzRSUzQ3JlY3QgeD0nNS44ODgxOCcgd2lkdGg9JzIyLjg5JyBoZWlnaHQ9JzIyLjg5JyB0cmFuc2Zvcm09J3JvdGF0ZSgxNSA1Ljg4ODE4IDApJyBmaWxsPSclMjMwMDY2RkYnLyUzRSUzQ3BhdGggZmlsbC1ydWxlPSdldmVub2RkJyBjbGlwLXJ1bGU9J2V2ZW5vZGQnIGQ9J00yMC41NDMgOC43NTA4TDIwLjU0OSA4Ljc1NjhDMjEuMTUgOS4zNTc4IDIxLjE1IDEwLjMzMTggMjAuNTQ5IDEwLjkzMjhMMTEuODE3IDE5LjY2NDhMNy40NSAxNS4yOTY4QzYuODUgMTQuNjk1OCA2Ljg1IDEzLjcyMTggNy40NSAxMy4xMjE4TDcuNDU3IDEzLjExNDhDOC4wNTggMTIuNTEzOCA5LjAzMSAxMi41MTM4IDkuNjMzIDEzLjExNDhMMTEuODE3IDE1LjI5OThMMTguMzY3IDguNzUwOEMxOC45NjggOC4xNDk4IDE5Ljk0MiA4LjE0OTggMjAuNTQzIDguNzUwOFonIGZpbGw9J3doaXRlJy8lM0UlM0MvZyUzRSUzQ2RlZnMlM0UlM0NjbGlwUGF0aCBpZD0nY2xpcDBfOF80NiclM0UlM0NyZWN0IHdpZHRoPScyOCcgaGVpZ2h0PScyOCcgZmlsbD0nd2hpdGUnLyUzRSUzQy9jbGlwUGF0aCUzRSUzQy9kZWZzJTNFJTNDL3N2ZyUzRSIgdGl0bGU9IlZlcmlmaWVkIEJhZGdlIEljb24iIGFsdD0iVmVyaWZpZWQgQmFkZ2UgSWNvbiI+PC9zcGFuPjwvc3Bhbj4=");
                    getUserData()
                        .then(res => {
                            if (res) {
                                return res
                            } else {
                                return {};
                            }
                        })
                        .then(json => {
                            if (json["id"]) {
                                var userId = json["id"];
                                if (window.location.pathname == `/users/${userId}/profile`) {
                                    var main_headers = document.getElementsByClassName("header-title");
                                    main_headers = Array.prototype.slice.call(main_headers);
                                    if (main_headers.length > 0) {
                                        var premium_logos = document.getElementsByClassName("premium-badge-right-aligned");
                                        premium_logos = Array.prototype.slice.call(premium_logos);
                                        if (premium_logos.length > 0) {
                                            premium_logos.forEach((premium) => {
                                                premium.remove();
                                            });
                                        }
                                        main_headers.forEach((main_header) => {
                                            main_header.innerHTML = main_header.innerHTML + profile_html;
                                        });
                                    }
                                }

                                var name_on_side = document.getElementsByClassName("font-header-2 dynamic-ellipsis-item");
                                name_on_side = Array.prototype.slice.call(name_on_side);
                                if (name_on_side.length > 0) {
                                    name_on_side.forEach((main_name_on_side) => {
                                        if (main_name_on_side.innerHTML == json["displayName"]) {
                                            main_name_on_side.innerHTML = `${main_name_on_side.innerHTML} ${name_side_html}`;
                                        }
                                    });
                                }

                                var group_owners = document.getElementsByClassName("text-link ng-binding ng-scope");
                                group_owners = Array.prototype.slice.call(group_owners);
                                if (group_owners.length > 0) {
                                    function applyCallback() {
                                        var group_owners = document.getElementsByClassName("text-link ng-binding ng-scope");
                                        group_owners = Array.prototype.slice.call(group_owners);
                                        group_owners.forEach((group_owner_name) => {
                                            if (group_owner_name.innerHTML == json["displayName"] && group_owner_name.href == `https://www.roblox.com/users/${userId}/profile`) {
                                                group_owner_name.innerHTML = `${group_owner_name.innerHTML} ${name_side_html}`;
                                            }
                                        });

                                        var group_shouts = document.getElementsByClassName("text-name name ng-binding ng-scope");
                                        group_shouts = Array.prototype.slice.call(group_shouts);
                                        if (group_shouts.length > 0) {
                                            var shout = group_shouts[0];
                                            if (shout.innerHTML == json["displayName"] && shout.href == `https://www.roblox.com/users/${userId}/profile`) {
                                                shout.innerHTML = `${shout.innerHTML} ${name_html_larger}`;
                                            }
                                        }

                                        var name_in_group = document.getElementsByClassName("text-overflow font-caption-header member-name ng-binding ng-scope");
                                        name_in_group = Array.prototype.slice.call(name_in_group);
                                        if (name_in_group.length > 0) {
                                            name_in_group.forEach((main_name_on_group) => {
                                                if (main_name_on_group.innerHTML == json["displayName"]) {
                                                    main_name_on_group.innerHTML = `${main_name_on_group.innerHTML} ${name_side_html}`;
                                                }
                                            });
                                        }

                                        var group_payouts_auto = document.getElementsByClassName("avatar-card-name text-lead text-overflow ng-binding ng-scope");
                                        group_payouts_auto = Array.prototype.slice.call(group_payouts_auto);
                                        if (group_payouts_auto.length > 0) {
                                            group_payouts_auto.forEach((main_name_on_group) => {
                                                if (main_name_on_group.innerHTML == json["displayName"] && main_name_on_group.href == `https://www.roblox.com/users/${userId}/profile`) {
                                                    main_name_on_group.innerHTML = `${main_name_on_group.innerHTML} ${name_side_html}`;
                                                }
                                            });
                                        }
                                    }
                                    var applied_updating = false;
                                    var applied_updating_v2 = false;
                                    group_owners.forEach((group_owner_name) => {
                                        if (group_owner_name.innerHTML == json["displayName"] && group_owner_name.href == `https://www.roblox.com/users/${userId}/profile`) {
                                            group_owner_name.innerHTML = `${group_owner_name.innerHTML} ${name_side_html}`;
                                            if (applied_updating == false) {
                                                var group_headers = document.getElementsByClassName("group-title");
                                                group_headers = Array.prototype.slice.call(group_headers);
                                                if (group_headers.length > 0) {
                                                    var group_header = group_headers[1];
                                                    applied_updating = true;
                                                    var observer = new MutationObserver(applyCallback);
                                                    observer.observe(group_header, { attributes: true, childList: true });
                                                }
                                            }
                                        }
                                    });

                                    var group_shouts = document.getElementsByClassName("text-name name ng-binding ng-scope");
                                    group_shouts = Array.prototype.slice.call(group_shouts);
                                    if (group_shouts.length > 0) {
                                        var shout = group_shouts[0];
                                        if (shout.innerHTML == json["displayName"] && shout.href == `https://www.roblox.com/users/${userId}/profile`) {
                                            shout.innerHTML = `${shout.innerHTML} ${name_html_larger}`;
                                        }
                                    }

                                    var group_payouts_auto = document.getElementsByClassName("avatar-card-name text-lead text-overflow ng-binding ng-scope");
                                    group_payouts_auto = Array.prototype.slice.call(group_payouts_auto);
                                    if (group_payouts_auto.length > 0) {
                                        group_payouts_auto.forEach((main_name_on_group) => {
                                            if (main_name_on_group.innerHTML == json["displayName"] && main_name_on_group.href == `https://www.roblox.com/users/${userId}/profile`) {
                                                main_name_on_group.innerHTML = `${main_name_on_group.innerHTML} ${name_side_html}`;
                                            }
                                        });
                                    }

                                    var name_in_group = document.getElementsByClassName("text-overflow font-caption-header member-name ng-binding ng-scope");
                                    name_in_group = Array.prototype.slice.call(name_in_group);
                                    if (name_in_group.length > 0) {
                                        name_in_group.forEach((main_name_on_group) => {
                                            if (main_name_on_group.innerHTML == json["displayName"]) {
                                                main_name_on_group.innerHTML = `${main_name_on_group.innerHTML} ${name_side_html}`;
                                            }
                                        });
                                    }
                                    
                                    if (applied_updating_v2 == false) {
                                        var list_item = document.getElementsByClassName("tab-content rbx-tab-content col-xs-12");
                                        list_item = Array.prototype.slice.call(list_item);
                                        if (list_item.length > 0) {
                                            var group_list_header = list_item[0];
                                            applied_updating_v2 = true;
                                            var observer = new MutationObserver(applyCallback);
                                            observer.observe(group_list_header, { attributes: true, childList: true });
                                        }
                                    }
                                }

                                var username_containers = document.getElementsByClassName("user-name-container");
                                username_containers = Array.prototype.slice.call(username_containers);
                                if (username_containers.length > 0) {
                                    username_containers.forEach((user_container) => {
                                        if (user_container.innerHTML.includes(json["displayName"])) {
                                            user_container.innerHTML = `${user_container.innerHTML} ${name_html}`;
                                        }
                                    });
                                }

                                function applyAutoChangeFunctionB() {
                                    setTimeout(function () {
                                        var username_containers_2 = document.getElementsByClassName("creator-name text-link");
                                        username_containers_2 = Array.prototype.slice.call(username_containers_2);
                                        if (username_containers_2.length > 0) {
                                            username_containers_2.forEach((user_container) => {
                                                if (user_container.innerHTML == `@${json["name"]}` && user_container.className == "creator-name text-link") {
                                                    user_container.innerHTML = `${user_container.innerHTML} ${name_side_html}`;
                                                }
                                            });
                                        }
                                        
                                        var username_containers_7 = document.getElementsByClassName("avatar-name text-overflow ng-binding");
                                        username_containers_7 = Array.prototype.slice.call(username_containers_7);
                                        if (username_containers_7.length > 0) {
                                            username_containers_7.forEach((user_container) => {
                                                if (user_container.innerHTML == `${json["displayName"]}` && user_container.className == "avatar-name text-overflow ng-binding") {
                                                    user_container.outerHTML = `${user_container.innerHTML} ${name_small_html}`;
                                                }
                                            });
                                        }
                                    }, 1000)
                                }

                                function applyAutoChangeFunctionC() {
                                    setTimeout(function () {
                                        var username_containers_7 = document.getElementsByClassName("avatar-name text-overflow ng-binding");
                                        username_containers_7 = Array.prototype.slice.call(username_containers_7);
                                        if (username_containers_7.length > 0) {
                                            username_containers_7.forEach((user_container) => {
                                                if (user_container.innerHTML == `${json["displayName"]}` && user_container.className == "avatar-name text-overflow ng-binding") {
                                                    user_container.outerHTML = `${user_container.innerHTML} ${name_small_html}`;
                                                }
                                            });
                                        }

                                        var list_item = document.getElementsByClassName("hlist avatar-cards");
                                        list_item = Array.prototype.slice.call(list_item);
                                        if (list_item.length > 0) {
                                            var catalog_list_header = list_item[0];
                                            var observer = new MutationObserver(applyAutoChangeFunctionB);
                                            observer.observe(catalog_list_header, { childList: true });
                                        }
                                    }, 1000)
                                }

                                var username_containers_2 = document.getElementsByClassName("creator-name text-link");
                                username_containers_2 = Array.prototype.slice.call(username_containers_2);
                                if (username_containers_2.length > 0) {
                                    username_containers_2.forEach((user_container) => {
                                        if (user_container.innerHTML == `@${json["name"]}` && user_container.className == "creator-name text-link") {
                                            user_container.innerHTML = `${user_container.innerHTML} ${name_side_html}`;
                                        }
                                    });
                                }

                                var username_containers_3 = document.getElementsByClassName("text-name text-overflow");
                                username_containers_3 = Array.prototype.slice.call(username_containers_3);
                                if (username_containers_3.length > 0) {
                                    username_containers_3.forEach((user_container) => {
                                        if (user_container.innerHTML == `@${json["name"]}`) {
                                            user_container.innerHTML = `${user_container.innerHTML}${game_html}`;
                                        }
                                    });
                                }

                                var username_containers_4 = document.getElementsByClassName("text-name");
                                username_containers_4 = Array.prototype.slice.call(username_containers_4);
                                if (username_containers_4.length > 0) {
                                    username_containers_4.forEach((user_container) => {
                                        if (user_container.innerHTML == `@${json["name"]}`) {
                                            user_container.innerHTML = `${user_container.innerHTML}${game_html}`;
                                        }
                                    });
                                }
                                
                                var username_containers_5 = document.getElementsByClassName("text-overflow age-bracket-label-username font-caption-header");
                                username_containers_5 = Array.prototype.slice.call(username_containers_5);
                                if (username_containers_5.length > 0) {
                                    username_containers_5.forEach((user_container) => {
                                        if (user_container.innerHTML == `${json["displayName"]}` && user_container.className == "text-overflow age-bracket-label-username font-caption-header") {
                                            user_container.innerHTML = `${user_container.innerHTML} ${name_side_html}`;
                                        }
                                    });
                                }
                                
                                var username_containers_6 = document.getElementsByClassName("text-name name ng-binding");
                                username_containers_6 = Array.prototype.slice.call(username_containers_6);
                                if (username_containers_6.length > 0) {
                                    username_containers_6.forEach((user_container) => {
                                        if (user_container.innerHTML == `${json["displayName"]}` && user_container.className == "text-name name ng-binding") {
                                            user_container.innerHTML = `${user_container.innerHTML} ${name_side_html}`;
                                        }
                                    });
                                }
                                
                                var username_containers_7 = document.getElementsByClassName("avatar-name text-overflow ng-binding");
                                username_containers_7 = Array.prototype.slice.call(username_containers_7);
                                if (username_containers_7.length > 0) {
                                    username_containers_7.forEach((user_container) => {
                                        if (user_container.innerHTML == `${json["displayName"]}` && user_container.className == "avatar-name text-overflow ng-binding") {
                                            user_container.outerHTML = `${user_container.innerHTML} ${name_small_html}`;
                                        }
                                    });
                                }

                                var list_item = document.getElementsByClassName("hlist item-cards-stackable ng-scope");
                                list_item = Array.prototype.slice.call(list_item);
                                if (list_item.length > 0) {
                                    var catalog_list_header = list_item[0];
                                    var observer = new MutationObserver(applyAutoChangeFunctionB);
                                    observer.observe(catalog_list_header, { childList: true });
                                }

                                var list_item = document.getElementsByClassName("tab-content configure-group-details");
                                list_item = Array.prototype.slice.call(list_item);
                                if (list_item.length > 0) {
                                    var catalog_list_header = list_item[0];
                                    var observer = new MutationObserver(applyAutoChangeFunctionC);
                                    observer.observe(catalog_list_header, { childList: true });
                                }

                                var list_item = document.getElementsByClassName("hlist avatar-cards");
                                list_item = Array.prototype.slice.call(list_item);
                                if (list_item.length > 0) {
                                    var catalog_list_header = list_item[0];
                                    var observer = new MutationObserver(applyAutoChangeFunctionB);
                                    observer.observe(catalog_list_header, { childList: true });
                                }

                                window.set_verified = true;
                            } else {
                                if (allow_messages) alert("Fake Verified Badge couldn't be applied since we couldn't figure what your User ID is.");
                            }
                        }).catch(err => {
                            console.error(err.message);
                            if (allow_messages) alert("We couldn't apply the verified badge due to an error! Sorry!");
                        })
                }
            } else {
                if (allow_messages) alert("Host couldn't be verified. Please make sure it's www.roblox.com. If your account is in privacy mode, it is not suggested to use as you need to be 13+ to get one for real.");
            }
        }
    }
})()