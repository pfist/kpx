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

  async exec () {
    // Set activity
    await this.client.user.setActivity(this.client.guilds.first().name, { type: 'WATCHING' })

    // Log connection state
    log.success(`${this.client.user.username} successfully connected to ${this.client.guilds.first().name}. All systems operational.`)
  }
}

export default ReadyListener
