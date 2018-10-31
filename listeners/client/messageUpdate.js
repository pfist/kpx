import { Listener } from 'discord-akairo'
import config from '../../bot.config.js'

class MessageUpdateListener extends Listener {
  constructor () {
    super('messageUpdate', {
      emitter: 'client',
      eventName: 'messageUpdate'
    })
  }

  async exec (oldMessage, newMessage) {
    // Message edited
    if (oldMessage.content !== newMessage.content) {
      const channel = await this.client.channels.find(channel => channel.name === config.messageLogChannel)

      const embed = this.client.util.embed()
      .setColor(config.colors.orange)
      .setTitle(':pencil: MESSAGE EDITED')
      .setDescription(`<@${oldMessage.author.id}> edited a message in ${oldMessage.channel}.`)
      .addField('Old Message', oldMessage.content)
      .addField('New Message', newMessage.content)
      .setTimestamp()

      return channel.send(embed)
    }
  }
}

export default MessageUpdateListener
