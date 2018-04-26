import { Command } from 'discord-akairo'

class AvatarCommand extends Command {
  constructor () {
    super('avatar', {
      aliases: ['avatar'],
      category: 'Utility',
      description: {
        content: `Get the large version of a user's avatar, or yourself if no argument is given.`,
        usage: '!avatar [user]'
      },
      userPermissions: ['VIEW_CHANNEL'],
      args: [
        {
          id: 'user',
          type: 'user',
          description: `The user who's avatar you want to get. Can be a username or ID.`,
          default: message => message.author,
          prompt: {
            start: `Who's avatar do you want to see?`,
            retry: 'Please enter a valid username or ID.',
            optional: true
          }
        }
      ]
    })
  }

  async exec (message, { user }) {
    message.util.send(`Here is the avatar for ${user.username}:`, {
      files: [user.displayAvatarURL.split('?')[0]]
    })
  }
}

export default AvatarCommand
