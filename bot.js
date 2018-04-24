import { AkairoClient } from 'discord-akairo'
import cli from 'commander'
import config from './bot.config.js'
import meta from './package.json'

// CLI for local development
cli
  .version(meta.version)
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
  allowMention: config.allowMention,
  handleEdits: config.handleEdits,
  commandUtil: true,
  commandDirectory: './commands',
  inhibitorDirectory: './inhibitors',
  listenerDirectory: './listeners'
})

client.login(token)
