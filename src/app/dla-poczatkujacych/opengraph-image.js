import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = 'Dla początkujących — OutsetRP'

export default function Image() {
  return ogImage({ eyebrow: 'Przewodnik', subtitle: 'Pierwszy raz w Los Santos' })
}
