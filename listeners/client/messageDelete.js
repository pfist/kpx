import { Listener } from 'discord-akairo'
import config from '../../bot.config.js'

class MessageDeleteListener extends Listener {
  constructor () {
    super('messageDelete', {
      emitter: 'client',
      eventName: 'messageDelete'
    })
  }

  async exec (message) {
    const channel = await this.client.channels.find(channel => channel.name === config.messageLogChannel)

    const embed = this.client.util.embed()
    .setTitle(':x: MESSAGE DELETED')
    .setDescription(`<@${message.author.id}> deleted a message in ${message.channel}.`)
    .addField('Deleted Message', message.content)
    .setFooter(`Message ID: ${message.id}`)

    return channel.send(embed)
  }
}

export default MessageDeleteListener
