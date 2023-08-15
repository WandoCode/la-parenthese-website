const menuButton = document.getElementById('open-menu-btn')

const headerNav = document.getElementsByClassName('header__nav')[0]

let burgerMenuIsOpen = false
let screenSizeIsMobile = window.screen.width < 1024

markActiveNavLinks()

// When the page load in mobile, menu is closed: links can't be focused
toogleMenuIsFocusable()

menuButton.addEventListener('click', openMobileMenu)
window.addEventListener('resize', handleWindowResize)

function openMobileMenu() {
  burgerMenuIsOpen = true
  headerNav.classList.add('show-menu')

  headerNav.addEventListener('keydown', onkeydown)
  menuButton.addEventListener('keydown', onkeydown)
  document.addEventListener('click', handleClick)

  toggleMainNav()
}

function closeMobileMenu() {
  burgerMenuIsOpen = false
  headerNav.classList.remove('show-menu')

  headerNav.removeEventListener('keydown', onkeydown)
  menuButton.removeEventListener('keydown', onkeydown)
  document.removeEventListener('click', handleClick)

  toggleMainNav()
}

function toggleMainNav() {
  menuButton.focus()
  toogleMenuIsFocusable()
  toggleMenuButtonListener()
  toggleMenuButtonImage()
  toggleAccessibilityDescriptions()
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

function handleWindowResize() {
  const precValScreenSizeIsMobile = screenSizeIsMobile
  screenSizeIsMobile = window.screen.width < 1024

  if (precValScreenSizeIsMobile !== screenSizeIsMobile) {
    toogleMenuIsFocusable()
    closeMobileMenu()
  }
}

function handleClick(e) {
  e.preventDefault()

  const target = e.target

  if (!headerNav.contains(target) && !menuButton.contains(target))
    closeMobileMenu()
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
    ? './public/close.svg'
    : './public/burger_menu.svg'
}

function toogleMenuIsFocusable() {
  const navLinks = headerNav.getElementsByTagName('a')

  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i]

    // Links are always focusable in desktop
    if (!screenSizeIsMobile) link.tabIndex = 0
    else link.tabIndex = burgerMenuIsOpen ? 0 : -1
  }
}

function toggleAccessibilityDescriptions() {
  const hiddenText = menuButton.getElementsByTagName('span')[0]

  menuButton.ariaLabel = burgerMenuIsOpen
    ? 'Close navigation'
    : 'Open navigation'

  hiddenText.innerText = burgerMenuIsOpen
    ? 'Close navigation'
    : 'Open navigation'
  menuButton.ariaExpanded = burgerMenuIsOpen
}

function onkeydown(e) {
  const key = e.key

  switch (key) {
    case 'Tab':
      const mainNavLinks = headerNav.getElementsByTagName('a')

      // Handle tab: keep focus in the menu
      if (
        !e.shiftKey &&
        document.activeElement === mainNavLinks[mainNavLinks.length - 1]
      ) {
        e.preventDefault()
        menuButton.focus()
      }
      // Handle shift+tab: keep focus in the menu
      if (e.shiftKey && document.activeElement === menuButton) {
        e.preventDefault()
        mainNavLinks[mainNavLinks.length - 1].focus()
      }
      break

    case 'Escape':
      closeMobileMenu()
      break

    default:
      break
  }
}
