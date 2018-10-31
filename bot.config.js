export default {
  // BASE

  // Default command prefix
  commandPrefix: '!',
  // Allow mention as a prefix
  allowMention: true,
  // Handle edited messages
  handleEdits: true,

  // EMBED COLORS
  colors: {
    red: [255, 107, 107],
    orange: [255, 169, 77],
    yellow: [255, 224, 102],
    green: [192, 235, 117],
    blue: [77, 171, 247],
    purple: [229, 153, 247]
  },

  // LOGS

  // Moderation log
  modLogChannel: 'moderation-log',
  // Message log
  messageLogChannel: 'message-log',
  // Server activity log
  serverLogChannel: 'server-log',
  // Suspicious activity alerts
  alertsChannel: 'alerts'
}
