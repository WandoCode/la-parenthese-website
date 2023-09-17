import AirDatepicker from 'air-datepicker'
import localeFr from 'air-datepicker/locale/fr'
import 'air-datepicker/air-datepicker.css'
const massageChoiceForm = document.getElementById(
  'massage-choice-form'
) as HTMLFormElement

function main() {
  fillMassageInputFromURLParams()
  new AirDatepicker('#date', {
    selectedDates: [new Date()],
    locale: localeFr,
  })

  new AirDatepicker('#heure', {
    locale: localeFr,
    timepicker: true,
    minHours: 9,
    maxHours: 18,
    minutesStep: 15,
    onlyTimepicker: true,
  })
}

function fillMassageInputFromURLParams() {
  const massageChoice = getMassageFromURLParams()

  if (massageChoice) {
    massageChoiceForm.elements['massage'].value = massageChoice
  }
}

function getMassageFromURLParams() {
  const url = new URL(window.location.href)
  const params = url.searchParams
  const massage = params.get('massage')

  return massage
}

main()
