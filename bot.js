import { AkairoClient } from 'discord-akairo'
import cli from 'commander'
import config from './bot.config.js'
import pkg from './package.json'

// CLI setup
cli
.version(pkg.version)
.option('-t, --token <token>', 'Bot token')
.option('-o, --owner <id>', 'Owner ID')
.parse(process.argv)

// Set bot token and owner ID
const token = cli.token ? cli.token : process.env.BOT_TOKEN
const owner = cli.owner ? cli.owner : process.env.OWNER_ID

// Client setup
const client = new AkairoClient({
  ownerID: owner,
  prefix: config.commandPrefix,
  allowMention: true,
  handleEdits: true,
  commandUtil: true,
  commandDirectory: './commands',
  inhibitorDirectory: './inhibitors',
  listenerDirectory: './listeners'
})

client.login(token)
