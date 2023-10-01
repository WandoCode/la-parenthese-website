let screenSizeIsMobile = window.screen.width < 1024

window.addEventListener('resize', updateScreenSizeIsMobile)

function updateScreenSizeIsMobile() {
  screenSizeIsMobile = window.screen.width < 1024
}

export { screenSizeIsMobile }
