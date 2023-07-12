import os
import sys
import requests 
import json

os.system("cls" if os.name == "nt" else "clear")
hideBackgroundConsole = True

if __name__ == '__main__' and hideBackgroundConsole == False:
    print("--------")
    print("Clearing Previous Console messages..")
    print("Loading Blacklisted Words..")
    
blacklisted_words = [
    {
        "word": "exec(",
        "mean": "Suspicious function used for running code from a string.",
        "level": 5
    },
    {
        "word": "exec(requests.",
        "mean": "Suspicious function used for running code from the internet.",
        "level": 5
    },
    {
        "word": "exec(conn.",
        "mean": "Suspicious function used for running code from the internet.",
        "level": 5
    },
    {
        "word": "exec(session.",
        "mean": "Suspicious function used for running code from the internet.",
        "level": 5
    },
    {
        "word": "fork(",
        "mean": "May be used as a background process.",
        "level": 4
    },
    {
        "word": "fork(session.",
        "mean": "May be used as a background process from the internet.",
        "level": 4
    },
    {
        "word": "fork(conn.",
        "mean": "May be used as a background process from the internet.",
        "level": 4
    },
    {
        "word": "fork(requests.",
        "mean": "May be used as a background process from the internet.",
        "level": 4
    },
    {
        "word": "ip_address",
        "mean": "This script mentions word IP.",
        "level": 3
    },
    {
        "word": "ipify",
        "mean": "This script uses your IP Address.",
        "level": 3
    },
    {
        "word": "grabify",
        "mean": "This script uses your IP Address.",
        "level": 3
    },
    {
        "word": "localhost",
        "mean": "This script mentions using localhost on your network.",
        "level": 3
    },
    {
        "word": "127.0.0.1",
        "mean": "This script mentions an localhost IP.",
        "level": 3
    },
    {
        "word": "logger",
        "mean": "Word logger detected.",
        "level": 3
    },
    {
        "word": "trade",
        "mean": "This word was detected and this could be used to trade other users.",
        "level": 3
    },
    {
        "word": "/webhooks/",
        "mean": "Uses a site to send a webhook",
        "level": 2
    },
    {
        "word": "raw.",
        "mean": "Connects to a raw version of a site",
        "level": 2
    },
    {
        "word": "raw.githubusercontent.com",
        "mean": "Connects to GitHub's Raw API.",
        "level": 2
    },
    {
        "word": "microsoft.com",
        "mean": "Connects to Microsoft's API.",
        "level": 2
    },
    {
        "word": "minecraft.net",
        "mean": "Connects to Minecraft's API.",
        "level": 2
    },
    {
        "word": "tinyurl",
        "mean": "Known site for shorting urls.",
        "level": 2
    },
    {
        "word": "discord.com",
        "mean": "Connects to Discord's API",
        "level": 2
    },
    {
        "word": "discordapp.com",
        "mean": "Connects to Discord's API",
        "level": 2
    },
    {
        "word": "discordapp.net",
        "mean": "Connects to Discord's API",
        "level": 2
    },
    {
        "word": "IP",
        "mean": "This script mentions word IP. Check if this script contains the word IP as it maybe detected between words.",
        "level": 1
    },
    {
        "word": "roblox.com",
        "mean": "Connects to Roblox's Servers.",
        "level": 1
    },
    {
        "word": "minecraft",
        "mean": "Mentions word minecraft",
        "level": 1
    },
    {
        "word": "microsoft",
        "mean": "Mentions word microsoft",
        "level": 1
    },
    {
        "word": "http://",
        "mean": "This script connects to an unsecured website.",
        "level": 1
    },
    {
        "word": "github.com",
        "mean": "Connects to GitHub",
        "level": 1
    },
    {
        "word": "requests",
        "mean": "This script connects to the internet.",
        "level": 1
    },
    {
        "word": "platform",
        "mean": "Gets device info",
        "level": 1
    },
    {
        "word": "pastebin",
        "mean": "This script uses pastebin.com for unknown reasons which may be a logger or not.",
        "level": 1
    },
    {
        "word": "https://",
        "mean": "This script connects to the internet securely",
        "level": 0
    },
]
whitelisted_words = []

if __name__ == '__main__' and hideBackgroundConsole == False:
    print("Loading Color Module..")

def printMainMessage(mes):
    print(f"\x1b[38;2;255;255;255m{mes}\033[38;5;231m")

def printErrorMessage(mes):
    print(f"\x1b[38;2;255;0;0m{mes}\033[38;5;231m")

def printSuccessMessage(mes):
    print(f"\x1b[38;2;0;255;0m{mes}\033[38;5;231m")

def printWarnMessage(mes):
    print(f"\x1b[38;2;255;75;0m{mes}\033[38;5;231m")

def genLevelMess(message, level):
    if level == 1:
        return f"\x1b[38;2;255;255;0m{message}\033[38;5;231m"
    elif level == 2:
        return f"\x1b[38;2;255;75;0m{message}\033[38;5;231m"
    elif level == 3:
        return f"\x1b[38;2;255;0;0m{message}\033[38;5;231m"
    elif level == 4:
        return f"\x1b[38;2;255;0;255m{message}\033[38;5;231m"
    elif level == 5:
        return f"\x1b[38;2;0;0;255m{message}\033[38;5;231m"
    else:
        return f"\x1b[38;2;0;255;0m{message}\033[38;5;231m"
    
def genoption(level):
    if level == 1:
        return f"\x1b[38;2;255;255;0mThis script is maybe safe\033[38;5;231m"
    elif level == 2:
        return f"\x1b[38;2;255;75;0mThis script is maybe a logger\033[38;5;231m"
    elif level == 3:
        return f"\x1b[38;2;255;0;0mThis script is maybe 50% a logger\033[38;5;231m"
    elif level == 4:
        return f"\x1b[38;2;255;0;255mThis script is 75% a logger\033[38;5;231m"
    elif level == 5:
        return f"\x1b[38;2;0;0;255mThis script is 100% a logger\033[38;5;231m"
    else:
        return f"\x1b[38;2;0;255;0mThis script is safe\033[38;5;231m"

def scan_contents(content):
    contentsFound = []
    if not content.find("Efaz's Logger Detector") == -1:
        if not content.find('printMainMessage("If you find a level 3, this means the script is using forbidden words that are dangerous.")') == -1:
            return [{
                "word": "Logger Detector",
                "mean": "This script identifies as this copy of the logger detector. If you think this is not a detector, this is mostly a logger hiding.",
                "level": 0
            }]
        else:
            return [{
                "word": "Warning!",
                "mean": "This script is trying to identify as this logger detector! Do not run the script scanned!",
                "level": 3
            }]
    else:
        for word in blacklisted_words:
            if not content.find(word["word"]) == -1:
                json_use = {}
                if word["word"] in whitelisted_words:
                    json_use = {
                        "word": word["word"],
                        "mean": "Whitelisted word",
                        "level": 0
                    }
                else:
                    if content.count(word["word"]) > 1:
                        json_use = {
                            "word": word["word"],
                            "mean": word["mean"] + " + " + str(content.count(word["word"]) - 1) + " more mentions",
                            "level": word["level"]
                        }
                    else:
                        json_use = word
                contentsFound.append(json_use)
        return contentsFound
    
def testIfURL(text):
    try:
        if text.startswith("https://"):
            req = requests.get(text)
            if req.status_code == 404:
                return {
                    "success": False,
                    "statement": "Website returns 404 (Not Found)"
                }
            else:
                if "text/html" in req.headers["content-type"]:
                    return {
                        "success": False,
                        "statement": "Received HTML instead of raw code."
                    }
                else:
                    return {
                        "success": True,
                        "statement": "This is a valid website with a SSL certificate"
                    }
        elif text.startswith("http://"):
            req = requests.get(text)
            if req.status_code == 404:
                return {
                    "success": False,
                    "statement": "Website returns 404 (Not Found)"
                }
            else:
                if "text/html" in req.headers["content-type"]:
                    return {
                        "success": False,
                        "statement": "Received HTML instead of raw code."
                    }
                else:
                    return {
                        "success": True,
                        "statement": "This is a valid website with no SSL certificate"
                    }
        else:
            return {
                "success": False,
                "statement": "Not a valid URL"
            }
    except Exception as e:
        return {
            "success": False,
            "statement": str(e)
        }
    
def scanAPI(dir):
    URLTest = testIfURL(dir)
    result = ["", 1]
    if URLTest["success"] == False and not URLTest["statement"] == "Not a valid URL":
        printErrorMessage("Error while testing URL: " + URLTest["statement"])
        return {
            "error": URLTest["statement"],
            "code": 400
        }
    if os.path.isfile(dir):
        result = [dir, 1]
    elif URLTest["success"] == True:
        result = [dir, 2]
    else:
        printErrorMessage("File not found")
        return {
            "error": "File not found",
            "code": 404
        }

    if result[1] == 1:
        with open(result[0]) as f:
            file_contents = f.read()
    elif result[1] == 2:
        file_contents = requests.get(result[0]).text
    else:
        printErrorMessage("Script brought an invalid type of directory.")
        file_contents = ""
    
    listFound = scan_contents(file_contents)
    highestLevel = 0
    for item in listFound:
        if item["level"] > highestLevel:
            highestLevel = item["level"]

    json = {
        "highestLevel": highestLevel,
        "itemList": listFound,
        "typeOfDirectory": result[1],
        "directory": result[0],
        "safeLevelMessage": f"Safe Level: {genoption(highestLevel)} (Level: {genLevelMess(str(highestLevel), highestLevel)})"
    }
    return json

def deleteDirectory(dir):
    if os.path.exists(dir):
        try:
            os.remove(dir)
            return {"success": True}
        except Exception as e:
            return {"success": False}
    else:
        return {"success": False}

def argumentHandler(args):
    if len(args) > 2:
        arg1 = args[1]
        arg2 = args[2]

        main_directory = ""

        if arg1 == "-console":
            main_directory = arg2
            listFound2 = scanAPI(main_directory)
            if listFound2.get("error"):
                printErrorMessage(f"Error while scanning file: {listFound2['error']} ({str(listFound2['code'])})")
            else:
                printMainMessage("--------")
                printMainMessage("")
                printMainMessage("Scan Finished!")
                printMainMessage("Results are below:")
                printMainMessage("")
                printMainMessage("Directory: " + main_directory)
                printMainMessage(f"Safe Level: {genoption(listFound2['highestLevel'])} (Level: {genLevelMess(str(listFound2['highestLevel']), listFound2['highestLevel'])})")
                if len(listFound2["itemList"]) > 0:
                    printMainMessage("Items that were found in the script:")
                    printMainMessage("")
                    for item in listFound2["itemList"]:
                        print(genLevelMess(item['word'] + " - " + item['mean'] + " - Level: " + str(item["level"]), item["level"]))
                    printMainMessage("")
                else:
                    printMainMessage("Items that were found in the script:")
                    printMainMessage("")
                    printSuccessMessage("None were found")
                    printMainMessage("")
                printMainMessage("--------")
                if listFound2['highestLevel'] > 2 and listFound2['typeOfDirectory'] == 1:
                    printMainMessage("Would you like to delete the file as its 50% or more untrusted? (y/n): ")
                    if input(">> ").lower() == "y":
                        res = deleteDirectory(main_directory)
                        if res["success"] == True:
                            printSuccessMessage("Successfully deleted the file from system: " + main_directory)
                        else:
                            printErrorMessage("Failed to delete the file from your system.")
        elif arg1 == "-json":
            main_directory = arg2
            printMainMessage(json.dumps(scanAPI(main_directory)))
        else:
            printErrorMessage("Error while scanning file: Argument 1 is not -json or -console.")

if __name__ == '__main__':
    printMainMessage("--------")
    printWarnMessage("Welcome to Efaz's Logger Detector!")
    printWarnMessage("Used for finding if following words were found in your python script.")
    printWarnMessage("If you find a level 3, this means the script is using forbidden words that are dangerous.")
    printWarnMessage("Script Version v1.0.0")

    def mainScript(dir):
        directory = ""
        typeOfDir = 1
        def promptDir():
            printMainMessage("--------")
            printMainMessage("Directory Section:")
            asked = input("What's your script to scan: ")
            asked = asked.replace("'", "")
            printMainMessage("Directory: " + asked)
            printMainMessage("----")
            printMainMessage("This is correct? (y/n): ")
            if input(">> ").lower() == "y":
                URLTest = testIfURL(asked)
                if URLTest["success"] == False and not URLTest["statement"] == "Not a valid URL":
                    printErrorMessage("Error while testing URL: " + URLTest["statement"])
                if os.path.isfile(asked):
                    return [asked, 1]
                elif URLTest["success"] == True:
                    printSuccessMessage(URLTest["statement"])
                    return [asked, 2]
                else:
                    printErrorMessage("File not found: Restarting..")
                    return promptDir()
            else:
                return promptDir()

        if dir == "":
            result = promptDir()
            directory = result[0]
            typeOfDir = result[1]
        else:
            directory = dir
            typeOfDir = 1

        if typeOfDir == 1:
            with open(directory) as f:
                file_contents = f.read()
        elif typeOfDir == 2:
            file_contents = requests.get(directory).text
        else:
            printErrorMessage("Script brought an invalid type of directory.")
            file_contents = ""
        listFound = scan_contents(file_contents)
        highestLevel = 0
        for item in listFound:
            if item["level"] > highestLevel:
                highestLevel = item["level"]
        printMainMessage("--------")
        printMainMessage("")
        printMainMessage("Scan Finished!")
        printMainMessage("Results are below:")
        printMainMessage("")
        printMainMessage("Directory: " + directory)
        printMainMessage(f"Safe Level: {genoption(highestLevel)} (Level: {genLevelMess(str(highestLevel), highestLevel)})")
        if len(listFound) > 0:
            printMainMessage("Items that were found in the script:")
            printMainMessage("")
            for item in listFound:
                print(genLevelMess(item['word'] + " - " + item['mean'] + " - Level: " + str(item["level"]), item["level"]))
            printMainMessage("")
        else:
            printMainMessage("Items that were found in the script:")
            printMainMessage("")
            printSuccessMessage("None were found")
            printMainMessage("")
        if highestLevel > 2 and typeOfDir == 1:
            printMainMessage("--------")
            printMainMessage("Would you like to delete the file as its 50% or more untrusted? (y/n): ")
            if input(">> ").lower() == "y":
                res = deleteDirectory(directory)
                if res["success"] == True:
                    printSuccessMessage("Successfully deleted the file from system: " + directory)
                else:
                    printErrorMessage("Failed to delete the file from your system.")
        else:
            printMainMessage("--------")
            printMainMessage("Deletion Assistant not started since this script doesn't reach highest level requirement.")
        printMainMessage("--------")
        printMainMessage("Try again with another file? (y/n): ")
        if input(">> ").lower() == "y":
            mainScript("")
        else:
            exit()
    
    if len(sys.argv) > 2:
        argumentHandler(sys.argv)
    else:
        mainScript("")

