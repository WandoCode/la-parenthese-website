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

    massageButton.addEventListener('click', () => handlemassageBtnClick(i))
  }
}

function handlemassageBtnClick(index: number) {
  for (let i = 0; i < massagesButton.length; i++) {
    const massageButton = massagesButton[i]
    const massageDetails = massagesDetails[i]
    const buttonText = buttonsText[i]
    const buttonContainer = buttonsContainer[i]
    const closeButton = closeButtons[i]

    if (i !== index || massageButton.ariaExpanded === 'true')
      closeMassageDetails(
        massageButton,
        massageDetails,
        buttonContainer,
        closeButton
      )
    else
      openMassageDetails(
        massageButton,
        massageDetails,
        buttonContainer,
        closeButton,
        buttonText
      )
  }
}

function openMassageDetails(
  button: HTMLButtonElement,
  infos: HTMLDivElement,
  btnContainer: HTMLDivElement,
  closeBtn: HTMLSpanElement,
  btnText: HTMLSpanElement
) {
  infos.style.display = 'block'
  button.ariaExpanded = 'true'
  btnContainer.style.transform = `translateX(${
    button.offsetWidth - btnText.offsetWidth
  }px)`

  closeBtn.style.transform = `translateX(0)`
}

function closeMassageDetails(
  button: HTMLButtonElement,
  infos: HTMLDivElement,
  btnContainer: HTMLDivElement,
  closeBtn: HTMLSpanElement
) {
  infos.style.display = 'none'
  button.ariaExpanded = 'false'
  btnContainer.style.transform = `translateX(0)`
  closeBtn.style.transform = `translateX(-100%)`
}