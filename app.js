const navsLinks = document.querySelectorAll('nav a')
const currentUrl = window.location.href
for (let i = 0; i < navsLinks.length; i++) {
  const a = navsLinks[i]
  if (a.href === currentUrl) {
    a.classList.toggle('current')
  }
}
