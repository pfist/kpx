import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'
import meta from '../../package.json'

class AboutCommand extends Command {
  constructor () {
    super('about', {
      aliases: ['about'],
      category: 'System',
      description: 'Get detailed info about the bot including features, stats, how to report bugs, and how to become a contributor.',
      userPermissions: ['VIEW_CHANNEL']
    })
  }

  async exec (message) {
    const creationDate = await DateTime.fromISO(this.client.user.createdAt.toISOString())
    const embed = this.client.util.embed()
      .setColor(1406667)
      .setTitle(`${this.client.user.username} ${meta.version}`)
      .setURL('https://github.com/polymoon/kpx')
      .setDescription(`Created on ${creationDate.toLocaleString(DateTime.DATETIME_FULL)}`)
      .setThumbnail(this.client.user.avatarURL)
      .addField('Report A Bug', 'If you encounter a bug or have a suggestion for improving the bot, submit an issue [on GitHub](https://github.com/polymoon/kpx/issues).')
      .addField('Contribute', 'If you want to help develop the bot, please read our [contributing guidelines](https://github.com/polymoon/kpx) to learn how to get started.')

    return message.util.send({ embed })
  }
}

export default AboutCommand
