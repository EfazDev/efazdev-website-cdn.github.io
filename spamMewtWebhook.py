import requests
from requests.structures import CaseInsensitiveDict
import json
import time
import os
import sys
import platform


def printMainMessage(mes):
    print(f"\033[38;5;231m{mes}\033[38;5;231m")


def printErrorMessage(mes):
    print(f"\033[38;5;196m{mes}\033[38;5;231m")


def printWarnMessage(mes):
    print(f"\033[38;5;214m{mes}\033[38;5;231m")


def whichPythonCommand():
    LocalMachineOS = platform.system()
    if (
        LocalMachineOS == "win32"
        or LocalMachineOS == "win64"
        or LocalMachineOS == "Windows"
    ):
        return "python"
    else:
        return "python3"


if whichPythonCommand() == "python3":
    os.system("clear")
else:
    os.system("cls")

printMainMessage("")
printMainMessage("Mewt Fake Purchase Discord Webhook Sender")
printMainMessage("Best way to prank someone with the mewt sniper lol")
printMainMessage("Made by @EfazDev")
printMainMessage("")
printMainMessage("Using mewt version step sis version 2")
printMainMessage("Use help() to view the commands!")
printMainMessage("Command Prompt Mode:")
printMainMessage("")
printErrorMessage(
    "We are not responsible for any misuse, any illegal activities or any activities of your Discord or Roblox account get banned due to spam."
)
printErrorMessage(
    "Your IP Address will be used using the webhook sender and shared between you and Discord. Your IP is not shared to us."
)
printWarnMessage("Version Sticker: v1.0 beta 3")
printMainMessage("")
embed_data = {
    "embeds": [
        {
            "title": "Roblox bought How to Prank Book",
            "description": "price: `0` \nfrom: `watcher`",
            "url": "https://roblox.com/catalog/136184391103/how-to-prank-book",
            "color": 16169167,
            "footer": {
                "text": "mewt - vstep sis version 2",
                "icon_url": "https://images-ext-2.discordapp.net/external/JXmhBSNsU_imOXaIrGnjgewbVWi0WfDfe2XlRYWgyyY/%3Fsize%3D56/https/cdn.discordapp.com/avatars/1094117399046930486/f201fb61415946dda8ba0cd81db6f652.webp",
            },
        }
    ]
}

target_link = "https://discord.com/api/webhooks/"


def validateArguments():
    listOfArgs = sys.argv
    if len(listOfArgs) >= 6:
        return True, {
            "url": listOfArgs[1],
            "username": listOfArgs[2],
            "item": listOfArgs[3],
            "price": listOfArgs[4],
            "fromlocation": listOfArgs[5],
            "itemlink": listOfArgs[6],
        }
    else:
        return False, {}


def main(link, tries):
    headers = CaseInsensitiveDict()
    headers["Content-Type"] = "application/json"

    count = 0
    while True:
        resp = requests.post(link, headers=headers, data=json.dumps(embed_data))
        if resp.status_code < 400:
            printMainMessage(
                f"Webhook sent successfully! Response: {resp.text} ({resp.status_code})"
            )
            return True, resp.text
        else:
            if count >= tries + 1:
                return False, resp.text
            else:
                count = count + 1
                printErrorMessage(
                    f"Failed to send, response: {resp.text} ({resp.status_code})"
                )
                resp_json = resp.json()
                if resp_json:
                    if resp_json.get("retry_after"):
                        time.sleep(resp_json["retry_after"])
                    else:
                        time.sleep(1)
                else:
                    time.sleep(1)


def restart():
    global target_link
    linkInput = input(">> ")
    if linkInput == "exit()":
        printMainMessage("Ending script..")
        exit()
    elif linkInput == "embed_data()":
        linkInput1 = input("Enter Username: ")
        linkInput2 = input("Enter Item Name: ")
        linkInput3 = input("Enter Price: ")
        linkInput4 = input("Enter From Location: ")
        linkInput5 = input("Enter Item Link: ")
        global embed_data
        embed_data = {
            "embeds": [
                {
                    "title": f"{linkInput1} bought {linkInput2}",
                    "description": f"price: `{linkInput3}` \nfrom: `{linkInput4}`",
                    "url": linkInput5,
                    "color": 16169167,
                    "footer": {
                        "text": "mewt - vstep sis version 2",
                        "icon_url": "https://images-ext-2.discordapp.net/external/JXmhBSNsU_imOXaIrGnjgewbVWi0WfDfe2XlRYWgyyY/%3Fsize%3D56/https/cdn.discordapp.com/avatars/1094117399046930486/f201fb61415946dda8ba0cd81db6f652.webp",
                    },
                }
            ]
        }
        printMainMessage("Embed Data has been applied!")
    elif linkInput == "set_target_link()":
        linkInput2 = input("Enter Link to set to target: ")
        target_link = linkInput2
    elif linkInput == "help()":
        printMainMessage(" -- Help -- ")
        printMainMessage("")
        printMainMessage("exit() - Exit and Close Script")
        printMainMessage("embed_data() - Set Embed Data Contents")
        printMainMessage(
            "set_target_link() - Set target Link (doesn't save when restarted)"
        )
        printMainMessage("spam() - Spam a discord webhook")
        printMainMessage("printMain() - Print a message")
        printMainMessage("printError() - Print an error")
        printMainMessage("printWarn() - Print a warning")
        printMainMessage("currentTargetLink() - Print Current Target Link")
        printMainMessage("help() - This Command")
        printMainMessage("")
        printMainMessage(" -- End of Help Command -- ")
    elif linkInput == "spam()":
        if target_link == "https://discord.com/api/webhooks/":
            printErrorMessage("Still using default target link, please set it.")
        else:
            linkInput2 = input("Confirm Spam? (y/n): ")
            if linkInput2.lower() == "y":
                printMainMessage("Started Spam Launcher! To end it, close the window.")
                while True:
                    res1, res2 = main(target_link, 10)
                    printMainMessage(
                        f"Response finished: {str(res1)} with response: {str(res2)}"
                    )
                    time.sleep(0)
            else:
                printErrorMessage("User declined spam command.")
    elif linkInput == "send()":
        if target_link == "https://discord.com/api/webhooks/":
            printErrorMessage("Still using default target link, please set it.")
        else:
            res1, res2 = main(target_link, 10)
            printMainMessage(
                f"Response finished: {str(res1)} with response: {str(res2)}"
            )
    elif linkInput == "printMain()":
        printMainMessage(input("Message: "))
    elif linkInput == "printError()":
        printErrorMessage(input("Message: "))
    elif linkInput == "printWarn()":
        printWarnMessage(input("Message: "))
    elif linkInput == "currentTargetLink()":
        printMainMessage(target_link)
    else:
        printErrorMessage("Command Not Found (404)")
    restart()


trueorfalse, argumenres = validateArguments()
if trueorfalse == True:
    print("Arguments Found, sending message")
    newData = {
        "embeds": [
            {
                "title": f"{argumenres['username']} bought {argumenres['item']}",
                "description": f"price: `{argumenres['price']}` \nfrom: `{argumenres['fromlocation']}`",
                "url": argumenres['itemlink'],
                "color": 16169167,
                "footer": {
                    "text": "mewt - vstep sis version 2",
                    "icon_url": "https://images-ext-2.discordapp.net/external/JXmhBSNsU_imOXaIrGnjgewbVWi0WfDfe2XlRYWgyyY/%3Fsize%3D56/https/cdn.discordapp.com/avatars/1094117399046930486/f201fb61415946dda8ba0cd81db6f652.webp",
                },
            }
        ]
    }
    target_link = argumenres['url']
    embed_data = newData
    if target_link == "https://discord.com/api/webhooks/":
        printErrorMessage("Still using default target link, please set it.")
    else:
        res1, res2 = main(target_link, 10)
        printMainMessage(
            f"Response finished: {str(res1)} with response: {str(res2)}"
        )
    printMainMessage("Returning to Main System")
    restart()
else:
    restart()
