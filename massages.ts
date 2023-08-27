const massagesButton = document.getElementsByClassName(
  'massage__main-btn'
) as HTMLCollectionOf<HTMLButtonElement>
const massagesDetails = document.getElementsByClassName(
  'massage-card'
) as HTMLCollectionOf<HTMLDivElement>
const buttonsText = document.getElementsByClassName(
  'massage__text'
) as HTMLCollectionOf<HTMLSpanElement>
const buttonsContainer = document.getElementsByClassName(
  'massage__container'
) as HTMLCollectionOf<HTMLDivElement>
const closeButtons = document.getElementsByClassName(
  'massage__close-btn'
) as HTMLCollectionOf<HTMLSpanElement>

main()

function main() {
  for (let i = 0; i < massagesButton.length; i++) {
    const massageButton = massagesButton[i]

    massageButton.addEventListener('click', () => handleMassageBtnClick(i))
  }
}

function handleMassageBtnClick(index: number) {
  const massageButton = massagesButton[index]
  const massageDetails = massagesDetails[index]
  const buttonText = buttonsText[index]
  const buttonContainer = buttonsContainer[index]
  const closeButton = closeButtons[index]

  if (massageButton.ariaExpanded === 'false')
    openMassageDetails(
      massageButton,
      massageDetails,
      buttonContainer,
      closeButton,
      buttonText
    )
  else
    closeMassageDetails(
      massageButton,
      massageDetails,
      buttonContainer,
      closeButton
    )
}

function openMassageDetails(
  button: HTMLButtonElement,
  infos: HTMLDivElement,
  btnContainer: HTMLDivElement,
  closeBtn: HTMLSpanElement,
  btnText: HTMLSpanElement
) {
  infos.style.height = '920px'

  button.ariaExpanded = 'true'
  btnContainer.style.transform = `translateX(${
    button.offsetWidth - btnText.offsetWidth
  }px)`

  closeBtn.style.transform = `translateX(10%)`
}

function closeMassageDetails(
  button: HTMLButtonElement,
  infos: HTMLDivElement,
  btnContainer: HTMLDivElement,
  closeBtn: HTMLSpanElement
) {
  infos.style.height = '0'
  button.ariaExpanded = 'false'
  btnContainer.style.transform = `translateX(0)`
  closeBtn.style.transform = `translateX(-150%)`
}
