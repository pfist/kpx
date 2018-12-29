import { Listener } from 'discord-akairo'
import Logger from 'lloogg'

const log = new Logger()

class DisconnectListener extends Listener {
  constructor() {
    super('disconnect', {
      emitter: 'client',
      eventName: 'disconnect'
    })
  }

  exec () {
    // Log connection state
    log.info(`${this.client.user.username} disconnected from ${this.client.guilds.first().name}.`)
  }
}

export default DisconnectListener
