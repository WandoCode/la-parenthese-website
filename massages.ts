import { screenSizeIsMobile } from './helpers'

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

const reservationsLinks = document.getElementsByClassName(
  'massage-card__btn'
) as HTMLCollectionOf<HTMLAnchorElement>

main()

function main() {
  for (let i = 0; i < massagesButton.length; i++) {
    const massageButton = massagesButton[i]

    massageButton.addEventListener('click', () => handleMassageBtnClick(i))
  }

  for (let i = 0; i < reservationsLinks.length; i++) {
    const link = reservationsLinks[i]

    link.addEventListener('click', function (event) {
      event.preventDefault()

      const massageID = this.getAttribute('data-query')
      var params = '?param1=valeur1&param2=valeur2' // Vos paramètres
      var newUrl = this.href + `?massage=${massageID}` // L'URL de la page interne avec les paramètres
      window.location.href = newUrl
    })
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

  for (let i = 0; i < massagesButton.length; i++) {
    const dynamicElements = {
      massageButton: massagesButton[i],
      massageDetails: massagesDetails[i],
      buttonText: buttonsText[i],
      buttonContainer: buttonsContainer[i],
      closeButton: closeButtons[i],
      reservationButton: reservationButtons[i],
    }

    if (dynamicElements.massageButton.ariaExpanded === 'false' && index === i)
      openMassageDetails(dynamicElements)
    else closeMassageDetails(dynamicElements)
  }
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

  massageDetails.ariaHidden = 'false'
  massageDetails.ariaPressed = 'false'

  massageButton.ariaExpanded = 'true'

  closeButton.style.transform = `translateX(10%)`
  reservationButton.tabIndex = 0
  if (screenSizeIsMobile) {
    massageDetails.style.height = '920px'

    buttonContainer.style.transform = `translateX(${
      massageButton.offsetWidth - buttonText.offsetWidth
    }px)`
  } else {
    massageDetails.style.height = '650px'
    buttonContainer.style.transform = `translateX(10%)`
  }
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
