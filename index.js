require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()
const TOKEN = process.env.TOKEN

var characters = new Array();

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', receivedMessage => {
  if (receivedMessage.author == bot.user) { // Prevent bot from responding to its own messages
    return
  }

  if (receivedMessage.content.startsWith("!")) {
    processCommand(receivedMessage)
  }
})

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

  console.log("Command received: " + primaryCommand + " from " + receivedMessage.author)
  console.log("Arguments: " + arguments) // There may not be any arguments

  if (primaryCommand == "roll") {
    rollCommand(arguments, receivedMessage)
  } else if (primaryCommand == "newcharacter") {
    addCharacterCommand(arguments, receivedMessage)
  } else {
      receivedMessage.channel.send("I don't understand the command. Try `!roll`")
  }
}

function addCharacterCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
    receivedMessage.channel.send("You want to add a character " + arguments)
       == "name"
      var myCharacter = {
        owner: receivedMessage.author,
        name: arguments[0],
        str: arguments[1],
        will: arguments[2]
      }

      characters.push(myCharacter)
      
      receivedMessage.channel.send("You created: " + myCharacter.name + " str:" + myCharacter.str + " " + myCharacter.name + " to play with")
    
  } else {
    receivedMessage.channel.send("Please use: newcharacter <name> <str> <will>")
  }
}

function rollCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
    receivedMessage.channel.send("It looks like you want to roll " + arguments)
    
    for (var i=0; i < characters.length; i++) {
      if (characters[i].name === arguments[0] && characters[i].owner === receivedMessage.author) {
        receivedMessage.channel.send("Found :" + characters[i].name)
      }
  }
  }
  
}

function rollDiceCommand() {
  return Math.floor((Math.random() * 6) + 1)
}