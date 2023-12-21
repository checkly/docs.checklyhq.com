import { OpsgenieAlertChannel, SlackAlertChannel } from 'checkly/constructs'
import { alertChannelIds } from './defaults'

export const slackChannelOps = SlackAlertChannel.fromId(alertChannelIds.slack)
// removed temporarily for testing snapshots / visual comparisons
export const opsGenieChannelP3 = OpsgenieAlertChannel.fromId(alertChannelIds.opsGenieP3)
export const alertChannels = [slackChannelOps]
