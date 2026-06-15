import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = 'CortixRP — Serwer FiveM Roleplay'

export default function Image() {
  return ogImage({ eyebrow: 'Serwer FiveM Roleplay', subtitle: 'Twoja historia w Los Santos' })
}
