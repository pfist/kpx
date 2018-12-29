import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'
import meta from '../../package.json'

class AboutCommand extends Command {
  constructor () {
    super('about', {
      aliases: ['about'],
      category: 'Utility',
      description: {
        content: 'Get information about the bot.',
        usage: '!about'
      },
      userPermissions: ['VIEW_CHANNEL']
    })
  }

  async exec (message) {
    const avatar = await this.client.user.avatarURL
    const creationDate = await DateTime.fromISO(this.client.user.createdAt.toISOString())
    const embed = this.client.util.embed()
      .setColor(1406667)
      .setTitle(`${this.client.user.username} ${meta.version}`)
      .setURL('https://github.com/polymoon/kpx')
      .setDescription(`Created on ${creationDate.toLocaleString(DateTime.DATETIME_FULL)}. There is a bunch more I want to put here, but it's not written yet! There should probably be a list of features and a description of what this bot is designed to do.`)
      .setThumbnail(avatar)
      .addField('Report A Bug', 'If you encounter a bug or have a suggestion for improving the bot, submit an issue [on GitHub](https://github.com/polymoon/kpx/issues).', true)
      .addField('Contribute', 'If you want to help develop the bot, please read our [contributing guidelines](https://github.com/polymoon/kpx) to learn how to get started.', true)

    return message.util.send({ embed })
  }
}

export default AboutCommand
