export const primaryNavigations = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Chat app',
    path: '/chat',
    queryStr: 'userPersonate=1290'
  },
  {
    label: 'Our Work',
    path: '/our-work'
  },
  {
    label: 'Contact US',
    path: '/contactus'
  },
  {
    label: 'SignIn',
    path: '/signin',
    isRenderInSidenav: false
  }
]


export const sideNavConfig = [
  ...primaryNavigations,
  {
    label: 'Settings',
    path: '/settings'
  }
]

export const sideNavIconsConfig = {
  Home: 'fa-home',
  'Chat app': 'fa-commenting',
  'Our Work': 'fa-pencil',
  'Contact US': 'fa-file',
  Settings: 'fa-cog'
}

