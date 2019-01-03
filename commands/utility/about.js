import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'
import config from '../../bot.config.js'
import pkg from '../../package.json'

class AboutCommand extends Command {
  constructor () {
    super('about', {
      aliases: ['about'],
      category: 'Utility',
      description: {
        content: 'Get information about the bot.',
        usage: '!about'
      },
      userPermissions: ['SEND_MESSAGES']
    })
  }

  async exec (message) {
    // Get avatar
    const avatar = await this.client.user.avatarURL
    // Human-friendly creation date
    const birthdate = await DateTime.fromISO(this.client.user.createdAt.toISOString())
    // Initialize & populate embed
    const embed = this.client.util.embed()
    .setColor(config.colors.blue)
    .setThumbnail(avatar)
    .setDescription(`<@${this.client.user.id}>`)
    .addField('❯ Birthdate', `${birthdate.toLocaleString(DateTime.DATE_SHORT)} ${birthdate.toLocaleString(DateTime.TIME_SIMPLE)} ${birthdate.offsetNameShort}`, true)
    .addField('❯ Version', pkg.version, true)
    .addField('❯ Bugs & Feedback', `Find a bug? Want to suggest a feature? Submit an issue on [GitHub.](${pkg.bugs})`, true)
    .addField('❯ How to Contribute', `Interested in helping out? Check out the [contributing guidelines](${pkg.homepage}).`, true)

    // Send the embed
    return message.util.send({ embed })
  }
}

export default AboutCommand
