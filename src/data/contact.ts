export interface ContactLink {
  label: string
  handle: string
  href: string
  icon: string
  bg: string
  btnText: string
}

export const links: ContactLink[] = [
  {
    label: 'Email',
    handle: 'yuchenbao2015@gmail.com',
    href: 'mailto:yuchenbao2015@gmail.com',
    icon: '✉️',
    bg: '#fef9c3',
    btnText: 'Send Email',
  },
  {
    label: 'GitHub',
    handle: '@yuchenbao',
    href: '#',
    icon: '🐙',
    bg: '#f3f4f6',
    btnText: 'View GitHub',
  },
  {
    label: 'LinkedIn',
    handle: 'in/yuchenbao',
    href: 'https://www.linkedin.com/in/yuchenbao/',
    icon: '💼',
    bg: '#dbeafe',
    btnText: 'Connect',
  },
]
