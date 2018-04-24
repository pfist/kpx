import { Command } from 'discord-akairo'

class DisableCommand extends Command {
  constructor () {
    super('disable', {
      aliases: ['disable'],
      category: 'System',
      description: {
        content: 'Disable a command',
        usage: '!disable <command>'
      },
      userPermissions: ['BAN_MEMBERS'],
      args: [
        {
          id: 'command',
          type: 'command',
          description: 'The command to disable',
          prompt: {
            start: 'Which command would you like me to disable?',
            retry: message => `${message.content} is not a valid command. Please try again.`
          }
        }
      ]
    })
  }

  async exec (message, args) {
    const command = await this.handler.modules.get(args.command.id)

    if (!command.enabled) {
      return message.util.send(`The \`${args.command}\` command is already disabled.`)
    } else {
      await command.disable()
      return message.util.send(`The \`${args.command}\` command has been disabled.`)
    }
  }
}

export default DisableCommand
