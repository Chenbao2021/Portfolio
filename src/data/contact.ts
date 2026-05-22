export interface ContactLink {
  label: string
  handle: string
  href: string
  icon: string
  colorKey: 'yellow' | 'gray' | 'blue'
  btnText: string
}

export const links: ContactLink[] = [
  {
    label: 'Email',
    handle: 'yuchenbao2015@gmail.com',
    href: 'mailto:yuchenbao2015@gmail.com',
    icon: '✉️',
    colorKey: 'yellow',
    btnText: 'Send Email',
  },
  {
    label: 'GitHub',
    handle: '@yuchenbao',
    href: '#',
    icon: '🐙',
    colorKey: 'gray',
    btnText: 'View GitHub',
  },
  {
    label: 'LinkedIn',
    handle: 'in/yuchenbao',
    href: 'https://www.linkedin.com/in/yuchenbao/',
    icon: '💼',
    colorKey: 'blue',
    btnText: 'Connect',
  },
]
