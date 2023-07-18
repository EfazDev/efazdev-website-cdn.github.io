import discord
import json
import os

os.system("cls" if os.name == "nt" else "clear")
version = "v1.0.0"
hideBackgroundConsole = True
console_logs = []

def printBackgroundConsole(message):
    if hideBackgroundConsole == False and __name__ == "__main__":
        print(message)
        console_logs.append(message)

def printErrorMessage(mes):
    print(f"\x1b[38;2;255;0;0m{mes}\033[38;5;231m")
    console_logs.append(mes + " - ERROR")

def printMainMessage(mes):
    print(f"\x1b[38;2;255;255;255m{mes}\033[38;5;231m")
    console_logs.append(mes + " - Main")

def printSuccessMessage(mes):
    print(f"\x1b[38;2;0;255;0m{mes}\033[38;5;231m")
    console_logs.append(mes + " - SUCCESS")

def printWarnMessage(mes):
    print(f"\x1b[38;2;255;75;0m{mes}\033[38;5;231m")
    console_logs.append(mes + " - WARN")

if __name__ == "__main__":
    printWarnMessage("Welcome to Discord Bot Login!")
    printWarnMessage("Made by efazdev!")
    printWarnMessage("Any abuse from this is responsible to you only.")
    printWarnMessage("Make sure of ALL intents is enabled on the bot and admin permissions are enabled for role related commands.")
    printWarnMessage(f"Script Version: {version}")

    class MainBot(discord.Client):
        selected_server_id = 0
        selected_channel_id = 0
        help_command_list = [
            {
                "name": "server()",
                "mean": "Set Server Target"
            },
            {
                "name": "channel()",
                "mean": "Set Channel Target"
            },
            {
                "name": "new_message()",
                "mean": "Create New Message Object"
            },
            {
                "name": "set_presence()",
                "mean": "Set presence of Discord Bot."
            },
            {
                "name": "change_username()",
                "mean": "Change bot username!"
            },
            {
                "name": "add_role()",
                "mean": "Add role to an user!"
            },
            {
                "name": "remove_role()",
                "mean": "Remove role from an user!"
            },
            {
                "name": "get_roles()",
                "mean": "Get roles of user!"
            },
            {
                "name": "dm_user()",
                "mean": "DM User with message object"
            },
            {
                "name": "save_message()",
                "mean": "Convert Message Object to JSON that can be used later."
            },
            {
                "name": "send_message()",
                "mean": "Send message to channel target."
            },
            {
                "name": "fast_message()",
                "mean": "Send message to channel target fast without having to go through message creation process."
            },
            {
                "name": "ban_user()",
                "mean": "Ban a user from the target server"
            },
            {
                "name": "unban_user()",
                "mean": "Unban a user from the target server"
            },
            {
                "name": "info()",
                "mean": "View Info of the bot!"
            },
            {
                "name": "logout()",
                "mean": "Log out of the bot!"
            },
            {
                "name": "help()",
                "mean": "This command"
            }
        ]
        saved_messages = {
            "welcome": {
                "embed_enabled": True,
                "content_enabled": False,
                "content": "",
                "embed": discord.Embed.from_dict({
                    "footer": {
                        "text": "Made by @EfazDev",
                        "icon_url": "https://cdn.efaz.dev/cdn/png/logo.png"
                    },
                    "thumbnail": {
                        "url": "https://cdn.efaz.dev/cdn/png/logo_square.png"
                    },
                    "author": {
                        "name": "Efaz's Projects",
                        "url": "https://www.efaz.dev",
                        "icon_url": "https://cdn.efaz.dev/cdn/png/logo_square.png"
                    },
                    "fields": [
                        {
                            "inline": False,
                            "name": "Discord Server", 
                            "value": "[Click me](https://discord.efaz.dev)"
                        },
                        {
                            "inline": False,
                            "name": "Other Projects", 
                            "value": "[Click me](https://www.efaz.dev/projects)"
                        }
                    ],
                    "color": 16730880,
                    "type": "rich",
                    "description": "Thanks for using Discord Bot Login! This is an example embed message!", 
                    "url": "https://www.efaz.dev/discordbotlogin", 
                    "title": f"Hello User!"
                })
            }
        }
        
        async def on_ready(self):
            printSuccessMessage(f'Logged on as {self.user}!')
            await self.set_presence(f"Hello! My name is {self.user}!")
            while True:
                await self.main_command_prompt()

        count = 0
        async def addField(self, embed):
            self.count = self.count + 1
            if self.count == 5:
                self.count = 0
                return
            confirm = input("Want field? (Will appear 4 times) (y/n): ")
            if confirm.lower() == "y":
                embed.add_field(name=input("Name: "), value=input("Value: "), inline=False)
            await self.addField(embed)

        async def addThumbnail(self, embed):
            confirm = input("Want thumbnail? (y/n): ")
            if confirm.lower() == "y":
                embed.set_thumbnail(url=input("Enter URL: "))
        
        async def addAuthor(self, embed):
            confirm = input("Want author? (y/n): ")
            if confirm.lower() == "y":
                embed.set_author(name=input("Name: "), url=input("URL When Click if want: "), icon_url=input("Icon URL: "))

        async def addFooter(self, embed):
            confirm = input("Want footer? (y/n): ")
            if confirm.lower() == "y":
                embed.set_footer(text=input("Text: "), icon_url=input("Image if want: "))

        async def set_presence(self, text):
            await self.change_presence(status=discord.Status.online, activity=discord.Game(text))

        async def set_discord_name(self, new_user):
            await self.user.edit(username=new_user)

        def testIfNumber(self, string):
            res = 0
            try:
                res = int(string)
            except Exception as e:
                printErrorMessage(str(e))
                res = 0
            return res

        async def set_discord_icon(self, new_icon):
            await self.user.edit(avatar=new_icon)

        async def removerole(self, user, role):
            await self.remove_roles(user, role)
        
        async def addrole(self, user, role):
            await user.add_roles(role)
        
        async def banuser(self, guild, user, reason):
            await user.send(content=f"You have been banned from the server: {guild.name} for: {reason}")
            await user.ban(reason=reason)

        async def unbanuser(self, guild, user):
            await guild.unban(user)
            printSuccessMessage(f"Unbanned user")
            try:
                await user.send(content=f"You have been unbanned from the server: {guild.name}! Congrats!")
                printSuccessMessage("Sent notification to user!")
            except Exception as e:
                printErrorMessage("Failed to send notification to user. Maybe have DMs off outside servers.")

        async def new_message(self):
            jsonornot = input("JSON? (y/n): ")
            disabledPrompt = False
            if jsonornot.lower() == "y":
                valueToUse = input("Enter JSON Here: ")
                try:
                    jsonToUse = json.loads(valueToUse)
                    generatedMessage = {
                        "embed_enabled": jsonToUse["embed_enabled"],
                        "content_enabled": jsonToUse["content_enabled"],
                        "content": jsonToUse["content"],
                        "embed": discord.Embed.from_dict(jsonToUse["embed"])
                    }
                    disabledPrompt = True
                except Exception as e:
                    printErrorMessage("JSON is invalid: " + str(e))

            if disabledPrompt == False:
                embedornot = input("Embed or not (y/n): ")
                generatedMessage = {
                    "embed_enabled": False,
                    "content_enabled": True,
                    "content": "",
                    "embed": discord.Embed(title="", description="")
                }
                if embedornot.lower() == "y":
                    generatedMessage["embed_enabled"] = True
                    generatedMessage["embed"] = discord.Embed(
                        title=input("Enter Title: "),
                        description=input("Enter Description: "),
                        url=input("Enter URL If want: "),
                        color=int(input("Enter Color Hex: "), 16)
                    )
                    await self.addAuthor(generatedMessage["embed"])
                    await self.addField(generatedMessage["embed"])
                    await self.addThumbnail(generatedMessage["embed"])
                    await self.addFooter(generatedMessage["embed"])
                else:
                    generatedMessage["embed_enabled"] = False
                
                if generatedMessage["embed_enabled"] == True:
                    if input("Want content message?").lower() == "y":
                        generatedMessage["content"] = input("Message Content: ")
                    else:
                        generatedMessage["content_enabled"] = False
                else:
                    generatedMessage["content"] = input("Message Content: ")
            self.saved_messages[input("Enter Message Key for this message: ")] = generatedMessage
            printSuccessMessage("Generated Message!")

        async def main_command_prompt(self):
            system = input(">> ")

            if system == "server()":
                self.selected_server_id = self.testIfNumber(input("Enter Server ID: "))
                printSuccessMessage(f"Set Server Target to {str(self.selected_server_id)}!")
            elif system == "channel()":
                self.selected_channel_id = self.testIfNumber(input("Enter Channel ID: "))
                printSuccessMessage(f"Set Channel Target to {str(self.selected_channel_id)}!")
            elif system == "new_message()":
                await self.new_message()
            elif system == "set_presence()":
                await self.set_presence(input("Enter Presence Text: "))
                printSuccessMessage("Done!")
            elif system == "dm_user()":
                key = input("Enter Key: ")
                if self.saved_messages.get(key):
                    messagecontent = self.saved_messages[key]
                    user_id = input("Enter User ID: ")
                    if self.get_user(self.testIfNumber(user_id)):
                        user = self.get_user(self.testIfNumber(user_id))
                        if messagecontent["embed_enabled"] == True:
                            if messagecontent["content_enabled"] == True:
                                await user.send(embed=messagecontent["embed"], content=messagecontent["content"])
                            else:
                                await user.send(embed=messagecontent["embed"])
                        else:
                            await user.send(content=messagecontent["content"])
                        printSuccessMessage("Sent!")
                    else:
                        printErrorMessage("User doesn't exist.")
                else:
                    printErrorMessage("Failed to send, invalid key")
            elif system == "save_message()":
                key = input("Enter Key: ")
                if self.saved_messages.get(key):
                    jsonToSave = self.saved_messages[key]
                    finalJSON = {
                        "embed_enabled": jsonToSave["embed_enabled"],
                        "content_enabled": jsonToSave["content_enabled"],
                        "content": jsonToSave["content"],
                        "embed": jsonToSave["embed"].to_dict()
                    }
                    printSuccessMessage("Save this JSON: " + json.dumps(finalJSON))
                else:
                    printErrorMessage("Failed to save, invalid key")
            elif system == "send_message()":
                key = input("Enter Key: ")
                if self.saved_messages.get(key):
                    messagecontent = self.saved_messages[key]
                    if self.get_channel(self.selected_channel_id):
                        channel = self.get_channel(self.selected_channel_id)
                        if messagecontent["embed_enabled"] == True:
                            if messagecontent["content_enabled"] == True:
                                await channel.send(embed=messagecontent["embed"], content=messagecontent["content"])
                            else:
                                await channel.send(embed=messagecontent["embed"])
                        else:
                            await channel.send(content=messagecontent["content"])
                        printSuccessMessage("Sent!")
                    else:
                        printErrorMessage("Channel doesn't exist.")
                else:
                    printErrorMessage("Failed to send, invalid key")
            elif system == "fast_message()":
                if self.get_channel(self.selected_channel_id):
                    channel = self.get_channel(self.selected_channel_id)
                    await channel.send(content=input("Message: "))
                    printSuccessMessage("Sent!")
                else:
                    printErrorMessage("Channel doesn't exist.")
            elif system == "change_username()":
                await self.set_discord_name(input("New Bot Discord Username: "))
                printSuccessMessage(f"Changed Username to {self.user}")
            elif system == "add_role()":
                user_id = input("Enter User ID: ")
                guild = self.get_guild(self.selected_server_id)
                if guild and guild.get_member(self.testIfNumber(user_id)):
                    user = guild.get_member(self.testIfNumber(user_id))
                    printSuccessMessage(f"Got user: {user.name}")
                    role_id = input("Enter Role ID: ")
                    if guild.get_role(self.testIfNumber(role_id)):
                        role = guild.get_role(self.testIfNumber(role_id))
                        printSuccessMessage(f"Got role: {role.name}")
                        await self.addrole(user, role)
                        printSuccessMessage(f"Added role {role.name} to {user.name}")
                    else:
                        printErrorMessage("Failed to get role.")
                else:
                    printErrorMessage(f"User not found")
            elif system == "ban_user()":
                user_id = input("Enter User ID: ")
                guild = self.get_guild(self.selected_server_id)
                if guild and guild.get_member(self.testIfNumber(user_id)):
                    user = guild.get_member(self.testIfNumber(user_id))
                    printSuccessMessage(f"Got user: {user.name}")
                    await self.banuser(guild, user, input("Enter Ban Reason: "))
                    printSuccessMessage(f"Banned user and sent direct message to their DMs!")
                else:
                    printErrorMessage(f"User not found")
            elif system == "unban_user()":
                user_id = input("Enter User ID: ")
                guild = self.get_guild(self.selected_server_id)
                if guild and self.fetch_user(self.testIfNumber(user_id)):
                    user = await self.fetch_user(self.testIfNumber(user_id))
                    print("Got user: " + user.name)
                    await self.unbanuser(guild, user)
                else:
                    printErrorMessage(f"User not found")
            elif system == "get_roles()":
                user_id = input("Enter User ID: ")
                guild = self.get_guild(self.selected_server_id)
                if guild and guild.get_member(self.testIfNumber(user_id)):
                    user = guild.get_member(self.testIfNumber(user_id))
                    printSuccessMessage(f"Got user: {user.name}")
                    printMainMessage("List of roles in " + guild.name)
                    for i in user.roles:
                        printMainMessage(i.name)
                else:
                    printErrorMessage(f"User not found")
            elif system == "logout()":
                printMainMessage(f"Logging out of {self.user}..")
                await self.close()
                printSuccessMessage("Bot connection between Discord has been closed!")
                exit()
            elif system == "remove_role()":
                user_id = input("Enter User ID: ")
                guild = self.get_guild(self.selected_server_id)
                if guild and guild.get_member(self.testIfNumber(user_id)):
                    user = guild.get_member(self.testIfNumber(user_id))
                    printSuccessMessage(f"Got user: {user.name}")
                    role_id = input("Enter Role ID: ")
                    if guild.get_role(self.testIfNumber(role_id)):
                        role = guild.get_role(self.testIfNumber(role_id))
                        printSuccessMessage(f"Got role: {role.name}")
                        await self.removerole(user, role)
                        printSuccessMessage(f"Removed role {role.name} from {user.name}")
                    else:
                        printErrorMessage("Failed to get role.")
                else:
                    printErrorMessage(f"User not found")
            elif system == "info()":
                printWarnMessage("Bot Information")
                printMainMessage(f"User: {self.user}")
                printMainMessage(f"User ID: {self.user.id}")
                printMainMessage(f"Display Name: {self.user.display_name}")
                printMainMessage(f"Application ID: {self.application_id}")
                printMainMessage(f"Created At: {self.user.created_at}")
                printMainMessage(f"Activity: {self.activity}")
                printMainMessage(f"Target Server: {self.selected_server_id}")
                printMainMessage(f"Target Channel: {self.selected_channel_id}")
                printWarnMessage("Bot is in: ")
                printSuccessMessage("Servers: ")
                for server in self.guilds:
                    printMainMessage(f"{server.name} ({server.id})")
                    printSuccessMessage(f"{server.name} Channels: ")
                    for channel in server.text_channels:
                        printMainMessage(f"{channel.name} ({channel.id})")
                printWarnMessage("System Information")
                printMainMessage(f"Version: {version}")
            elif system == "help()":
                printMainMessage("List of Commands: ")
                for i in self.help_command_list:
                    printMainMessage(i["name"] + " - " + i["mean"])
            else:
                printErrorMessage("Invalid command")

    intents = discord.Intents.all()
    bot = MainBot(intents=intents)
    bot.run(input("Enter Discord Bot Token to continue: "))
else:
    printErrorMessage("Discord Bot Login is not available as a module. Sorry!")