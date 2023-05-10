import { OpsgenieAlertChannel, SlackAlertChannel } from 'checkly/constructs'
import { alertChannelIds } from './defaults'

export const slackChannelOps = SlackAlertChannel.fromId(alertChannelIds.slack)
export const opsGenieChannelP1 = OpsgenieAlertChannel.fromId(alertChannelIds.opsGenieP1)
export const opsGenieChannelP3 = OpsgenieAlertChannel.fromId(alertChannelIds.opsGenieP3)
export const alertChannels = [slackChannelOps, opsGenieChannelP3]
