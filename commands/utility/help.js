import { Command } from 'discord-akairo'

class HelpCommand extends Command {
  constructor () {
    super('help', {
      aliases: ['help', 'halp'],
      category: 'Utility',
      description: {
        content: 'Get a list of available commands, or detailed information about a specific command.',
        usage: '!help [command]'
      },
      channelRestriction: 'guild',
      userPermissions: ['VIEW_CHANNEL'],
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          description: 'The command you want to learn more about',
          optional: true,
          prompt: {
            retry: message => `${message.content} is not a valid command. Please try again.`,
            optional: true
          }
        }
      ]
    })
  }

  async exec (message, { command }) {
    const member = await this.client.guilds.first().member(message.author)

    // !help - Send a list of commands the member can use
    if (!command) {
      const embed = this.client.util.embed()
        .setColor(1406667)

      for (const category of this.handler.categories.values()) {
        const availableCommands = await category.filter(command => member.permissions.has(command.userPermissions))

        if (availableCommands.size !== 0) {
          const commandList = await availableCommands.map(command => `**${command.aliases[0]}** - ${command.description.content}`).join('\n')

          embed.addField(`${category.id} Commands`, [commandList, '\u200B'])
        }
      }

      embed.setFooter('Say !help [command] to learn more about a command. Example: !help ping')

      if (message.channel.type !== 'dm') {
        await message.reply('I sent you a direct message with the information you requested.')
      }

      return message.author.send(`Here is a list of available commands. Say \`${this.client.options.prefix}<command>\` or \`@${this.client.user.username} <command>\` to give me a command.`, { embed })
    }

    // !help [command] - Send instructions for a command if the member can use it
    if (member.permissions.has(command.userPermissions)) {
      const embed = this.client.util.embed()
        .setColor(1406667)
        .setTitle(command.aliases[0].toUpperCase())
        .setDescription([command.description.content, '\u200B'])
        .addField('Aliases', [command.aliases.toString().split(',').join(', '), '\u200B'], true)
        .addField('Category', [command.category, '\u200B'], true)
        .addField('Usage', [`\`\`\`${command.description.usage}\`\`\``, '\u200B'])

      const argsField = command.args.length ? command.args.map(arg => `**${arg.id}** - ${arg.description}`) : 'No arguments'

      embed.addField('Arguments', argsField)

      if (message.channel.type !== 'dm') {
        await message.reply('I sent you a direct message with the information you requested.')
      }

      return message.author.send({ embed })
    }
  }
}

export default HelpCommand
