const menuButton = document.getElementById('open-menu-btn')

const headerNav = document.getElementsByClassName('header__nav')[0]

let burgerMenuIsOpen = false

markActiveNavLinks()
toogleMenuIsFocused()
menuButton.addEventListener('click', openMobileMenu)

function markActiveNavLinks() {
  const navsLinks = document.querySelectorAll('nav a')
  const currentUrl = window.location.href

  for (let i = 0; i < navsLinks.length; i++) {
    const a = navsLinks[i]
    if (a.href === currentUrl) {
      a.classList.toggle('current')
    }
  }
}

function openMobileMenu() {
  burgerMenuIsOpen = !burgerMenuIsOpen
  toggleMenuButtonListener()
  headerNav.classList.add('show-menu')
  menuButton.focus()
  toogleMenuIsFocused()
  headerNav.addEventListener('keydown', onkeydown)
  menuButton.getElementsByTagName('img')[0].src = '/public/close.svg'
}

function closeMobileMenu() {
  burgerMenuIsOpen = !burgerMenuIsOpen

  toggleMenuButtonListener()
  headerNav.classList.remove('show-menu')
  toogleMenuIsFocused()
  menuButton.focus()
  headerNav.removeEventListener('keydown', onkeydown)
  menuButton.getElementsByTagName('img')[0].src = '/public/burger_menu.svg'
}

function toggleMenuButtonListener() {
  if (burgerMenuIsOpen) {
    menuButton.addEventListener('click', closeMobileMenu)
    menuButton.removeEventListener('click', openMobileMenu)
  } else {
    menuButton.addEventListener('click', openMobileMenu)
    menuButton.removeEventListener('click', closeMobileMenu)
  }
}

function toogleMenuIsFocused() {
  const navLinks = headerNav.getElementsByTagName('a')

  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i]
    link.tabIndex = burgerMenuIsOpen ? 0 : -1
  }
}

function onkeydown(e) {
  const key = e.key

  switch (key) {
    case 'Tab':
      const mainNavLinks = headerNav.getElementsByTagName('a')

      // If the current focused link is the last one, the next focus with tab will be changed
      if (document.activeElement === mainNavLinks[mainNavLinks.length - 1]) {
        e.preventDefault()
        menuButton.focus()
      }
      break

    case 'Escape':
      closeMobileMenu()
      break

    default:
      break
  }
}
