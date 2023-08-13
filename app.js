const menuButton = document.getElementById('open-menu-btn')

const headerNav = document.getElementsByClassName('header__nav')[0]

let burgerMenuIsOpen = false

markActiveNavLinks()

// When the page load in mobile, menu is closed: links can't be focused
toogleMenuIsFocusable()

menuButton.addEventListener('click', openMobileMenu)

function openMobileMenu() {
  burgerMenuIsOpen = !burgerMenuIsOpen

  headerNav.classList.add('show-menu')

  toogleMenuIsFocusable()
  menuButton.focus()

  toggleMenuButtonListener()
  headerNav.addEventListener('keydown', onkeydown)

  toggleMenuButtonImage()
}

function closeMobileMenu() {
  burgerMenuIsOpen = !burgerMenuIsOpen

  headerNav.classList.remove('show-menu')

  toogleMenuIsFocusable()
  menuButton.focus()

  toggleMenuButtonListener()
  headerNav.removeEventListener('keydown', onkeydown)

  toggleMenuButtonImage()
}

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

function toggleMenuButtonListener() {
  if (burgerMenuIsOpen) {
    menuButton.addEventListener('click', closeMobileMenu)
    menuButton.removeEventListener('click', openMobileMenu)
  } else {
    menuButton.addEventListener('click', openMobileMenu)
    menuButton.removeEventListener('click', closeMobileMenu)
  }
}

function toggleMenuButtonImage() {
  menuButton.getElementsByTagName('img')[0].src = burgerMenuIsOpen
    ? '/public/close.svg'
    : '/public/burger_menu.svg'
}

function toogleMenuIsFocusable() {
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
