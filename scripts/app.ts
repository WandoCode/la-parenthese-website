import burgerImg from '../public/burger_menu.svg'
import closeImg from '../public/close-primary.svg'
import { screenSizeIsMobile } from './helpers'

const menuButton = document.getElementById('open-menu-btn') as HTMLButtonElement

const headerNav = document.getElementsByClassName(
  'header__nav'
)[0] as HTMLElement
const headerFirst = document.getElementsByClassName(
  'header__first'
)[0] as HTMLDivElement
const logoFull = document.getElementsByClassName(
  'logo__full'
)[0] as HTMLImageElement
const logoIcon = document.getElementsByClassName(
  'logo__icon'
)[0] as HTMLImageElement

let burgerMenuIsOpen = false

markActiveNavLinks()

// When the page load in mobile, menu is closed: links can't be focused
toogleMenuIsFocusable()

menuButton.addEventListener('click', openMobileMenu)
window.addEventListener('resize', handleWindowResize)
window.addEventListener('scroll', handleScroll)

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
  const navsLinks = document.querySelectorAll(
    'nav a'
  ) as NodeListOf<HTMLAnchorElement>
  const currentUrl = window.location.href

  for (let i = 0; i < navsLinks.length; i++) {
    const link = navsLinks[i]
    if (link.href === currentUrl) {
      link.classList.toggle('current')
    }
  }
}

function handleScroll() {
  const screenIsOnTop = window.scrollY < 100

  if (!screenIsOnTop) {
    headerFirst.classList.add('header__first--reduced')
    logoFull.style.display = 'none'
    logoIcon.style.display = 'block'
  } else {
    headerFirst.classList.remove('header__first--reduced')
    logoFull.style.display = 'block'
    logoIcon.style.display = 'none'
  }
}

function handleWindowResize() {
  const precValScreenSizeIsMobile = screenSizeIsMobile

  if (precValScreenSizeIsMobile !== screenSizeIsMobile) {
    toogleMenuIsFocusable()
    closeMobileMenu()
  }
}

function handleClick(e) {
  const target = e.target

  if (!headerNav.contains(target) && !menuButton.contains(target)) {
    e.preventDefault()
    closeMobileMenu()
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
    ? closeImg
    : burgerImg
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
  menuButton.ariaExpanded = `${burgerMenuIsOpen}`
  menuButton.ariaPressed = `${burgerMenuIsOpen}`
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
