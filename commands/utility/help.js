import { Command } from 'discord-akairo'
import config from '../../bot.config.js'

class HelpCommand extends Command {
  constructor () {
    super('help', {
      aliases: ['help', 'halp'],
      category: 'Utility',
      description: {
        content: 'Get a list of commands for the bot.',
        usage: '!help [command]'
      },
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          description: 'The command you want to learn more about',
          optional: true,
          prompt: {
            retry:'That is not a valid command. Please try again.',
            optional: true
          }
        }
      ]
    })
  }

  async exec (message, { command }) {
    // Get the user as a guild member
    const member = await this.client.guilds.first().member(message.author)

    // Initialize embed
    const embed = this.client.util.embed().setColor(config.colors.blue)

    // !help - List all commands available to the user
    if (!command) {
      // Get command categories
      const categories = this.handler.categories.values()

      // Loop through categories
      for (const category of categories) {
        // Filter category for available commands
        const availableCommands = await category.filter(cmd => member.permissions.has(cmd.userPermissions))

        // Only add category to embed if commands are available
        if (availableCommands.size !== 0) {
          // Generate list of available commands for embed
          const commandList = await availableCommands.map(cmd => `**${this.client.options.prefix}${cmd.aliases[0]}** - ${cmd.description.content}`).join('\n')

          // Add list to embed
          embed.addField(`❯ ${category.id} Commands`, commandList)
        }
      }

      // Add additional tips to embed footer
      embed.setFooter('Say !help [command] to learn more about a command. Example: !help ping')

      // Only send this embed via DM
      if (message.channel.type !== 'dm') {
        message.reply('I sent you a DM with more information.')
      }

      // Send the embed
      return message.author.send('Here is a list of commands that are available:', { embed })
    }

    // !help [command] - Give detailed instructions for a command
    if (member.permissions.has(command.userPermissions)) {
      // Command arguments
      const argsField = command.args.length ? command.args.map(arg => `**${arg.id}** - ${arg.description}`) : 'No arguments'

      // Fill out embed
      embed
      .setTitle(`:speech_balloon: ${command.id.toUpperCase()}`)
      .setDescription(command.description.content)
      .addField('❯ Usage', `\`\`\`${command.description.usage}\`\`\``)
      .addField('❯ Arguments', argsField)

      // Only send this embed via DM
      if (message.channel.type !== 'dm') {
        message.reply('I sent you a DM with more information.')
      }

      // Send the embed
      return message.author.send({ embed })
    }
  }
}

export default HelpCommand
