export interface NavMenu {
  label: string
  path: string
}

export const NAV_MENUS: NavMenu[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Terbaru', path: '/kategori/terbaru' },
  { label: 'Hiburan', path: '/kategori/hiburan' },
  { label: 'Gaya Hidup', path: '/kategori/gaya-hidup' },
  { label: 'Olahraga', path: '/kategori/olahraga' },
  { label: 'Nasional', path: '/kategori/nasional' },
  { label: 'Internasional', path: '/kategori/internasional' },
]

