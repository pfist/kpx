import { Command } from 'discord-akairo'

class EnableCommand extends Command {
  constructor () {
    super('enable', {
      aliases: ['enable'],
      category: 'System',
      description: 'Enable a command',
      userPermissions: ['BAN_MEMBERS'],
      args: [
        {
          id: 'command',
          type: 'command',
          prompt: {
            start: 'Which command would you like me to enable?',
            retry: message => `${message.content} is not a valid command. Please try again.`
          }
        }
      ]
    })
  }

  async exec (message, args) {
    const command = await this.handler.modules.get(args.command.id)

    if (command.enabled) {
      return message.util.send(`The \`${args.command}\` command is already enabled.`)
    } else {
      await command.enable()
      return message.util.send(`The \`${args.command}\` command has been enabled.`)
    }
  }
}

export default EnableCommand
