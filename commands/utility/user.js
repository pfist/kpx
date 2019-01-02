import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'
import config from '../../bot.config.js'

class UserInfoCommand extends Command {
  constructor () {
    super('user', {
      aliases: ['user'],
      category: 'Utility',
      description: {
        content: 'Get information about a user.',
        usage: '!user [@username or ID]'
      },
      channelRestriction: 'guild',
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'member',
          type: 'member',
          description: 'The member you want to look up. Can be a username or ID.',
          default: message => message.member,
          prompt: {
            start: 'Which user do you want to look up?',
            retry: 'Please enter a valid username or ID.',
            optional: true
          }
        }
      ]
    })
  }

  async exec (message, { member }) {
    // Get avatar
    const avatar = await member.user.displayAvatarURL
    // Human-friendly date when this user joined Discord
    const discordJoinDate = await DateTime.fromISO(member.user.createdAt.toISOString())
    // Human-friendly date when this user joined the guild
    const guildJoinDate = await DateTime.fromISO(member.joinedAt.toISOString())
    // Human-friendly statuses
    const status = {
      online: 'Online',
      idle: 'Idle',
      dnd: 'Do Not Disturb',
      offline: 'Offline'
    }
    // Initialize & populate embed
    const embed = this.client.util.embed()
    .setColor(config.colors.blue)
    .setThumbnail(avatar)
    .setAuthor(`${member.user.tag}`, avatar)
    .addField('❯ Nickname', member.nickname ? member.nickname : 'N/A', true)
    .addField('❯ Status', status[member.presence.status], true)
    .addField(`❯ Joined Server`, guildJoinDate.toLocaleString(DateTime.DATETIME_MED), true)
    .addField('❯ Joined Discord', discordJoinDate.toLocaleString(DateTime.DATETIME_MED), true)
    .addField('❯ Highest Role', member.highestRole.name, true)
    .addField('❯ User Type', member.user.bot ? 'Bot' : 'Human', true)

    // Send embed
    return message.util.send({ embed })
  }
}

export default UserInfoCommand
