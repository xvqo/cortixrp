import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = 'OutsetRP · Polski serwer roleplay'

export default function Image() {
  return ogImage({ eyebrow: 'Serwer Roleplay', subtitle: 'Twoja historia w Los Santos' })
}
