import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = 'Regulamin serwera OutsetRP'

export default function Image() {
  return ogImage({ eyebrow: 'Regulamin', subtitle: 'Zasady serwera OutsetRP' })
}
