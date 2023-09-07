function main() {
  getURLParams()
}

function getURLParams() {
  const url = new URL(window.location.href)

  console.log(url)
}

main()
