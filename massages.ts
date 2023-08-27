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
const reservationButtons = document.getElementsByClassName(
  'massage-card__btn'
) as HTMLCollectionOf<HTMLAnchorElement>

main()

function main() {
  for (let i = 0; i < massagesButton.length; i++) {
    const massageButton = massagesButton[i]

    massageButton.addEventListener('click', () => handleMassageBtnClick(i))
  }
}

interface DynamicElements {
  massageButton: HTMLButtonElement
  massageDetails: HTMLDivElement
  buttonText: HTMLSpanElement
  buttonContainer: HTMLDivElement
  closeButton: HTMLSpanElement
  reservationButton: HTMLAnchorElement
}

function handleMassageBtnClick(index: number) {
  const dynamicElements = {
    massageButton: massagesButton[index],
    massageDetails: massagesDetails[index],
    buttonText: buttonsText[index],
    buttonContainer: buttonsContainer[index],
    closeButton: closeButtons[index],
    reservationButton: reservationButtons[index],
  }

  if (dynamicElements.massageButton.ariaExpanded === 'false')
    openMassageDetails(dynamicElements)
  else closeMassageDetails(dynamicElements)
}

function openMassageDetails(dynamicElements: DynamicElements) {
  const {
    massageDetails,
    massageButton,
    buttonContainer,
    buttonText,
    closeButton,
    reservationButton,
  } = dynamicElements
  massageDetails.style.height = '920px'
  massageDetails.ariaHidden = 'false'
  massageDetails.ariaPressed = 'false'

  massageButton.ariaExpanded = 'true'
  buttonContainer.style.transform = `translateX(${
    massageButton.offsetWidth - buttonText.offsetWidth
  }px)`

  closeButton.style.transform = `translateX(10%)`
  reservationButton.tabIndex = 0
}

function closeMassageDetails(dynamicElements: DynamicElements) {
  const {
    massageDetails,
    massageButton,
    buttonContainer,
    closeButton,
    reservationButton,
  } = dynamicElements
  massageDetails.style.height = '0'
  massageDetails.ariaHidden = 'true'
  massageDetails.ariaPressed = 'true'

  massageButton.ariaExpanded = 'false'
  buttonContainer.style.transform = `translateX(0)`
  closeButton.style.transform = `translateX(-150%)`
  reservationButton.tabIndex = -1
}
