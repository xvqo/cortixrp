const BASE = 'https://cortixrp.pl'

export default function sitemap() {
  const routes = ['', '/regulamin', '/dla-poczatkujacych', '/polityka-prywatnosci']
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))
}
