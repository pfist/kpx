import { Listener } from 'discord-akairo'
import Logger from 'lloogg'

const log = new Logger()

class ReadyListener extends Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    })
  }

  exec () {
    log.success(`${this.client.user.username} successfully connected to ${this.client.guilds.first().name}. All systems operational.`)
  }
}

export default ReadyListener
