import { Command } from 'discord-akairo'

class EnableCommand extends Command {
  constructor () {
    super('enable', {
      aliases: ['enable'],
      category: 'System',
      description: {
        content: 'Enable a command.',
        usage: '!enable <command>'
      },
      channelRestriction: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      protected: true,
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          description: 'The command to enable',
          prompt: {
            start: 'Which command do you want to enable?',
            retry: `That is not a valid command. Please try again.`
          }
        }
      ]
    })
  }

  async exec (message, args) {
    const command = await this.handler.modules.get(args.command.id)

    if (command.enabled) {
      return message.util.send(`:information_source: The \`${args.command}\` command is already enabled.`)
    } else {
      await command.enable()
      return message.util.send(`:white_check_mark: The \`${args.command}\` command is now enabled.`)
    }
  }
}

export default EnableCommand
