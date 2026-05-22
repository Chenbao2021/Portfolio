export interface NavLink {
  label: string
  to: string
}

export const navLinks: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Notes', to: '/notes' },
  { label: 'Philosophy', to: '/philosophy' },
  { label: 'Games', to: '/games' },
  { label: 'Contact', to: '/contact' },
]
