import AirDatepicker from 'air-datepicker'
import localeFr from 'air-datepicker/locale/fr'
import 'air-datepicker/air-datepicker.css'

function main() {
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
  getURLParams()
}

function getURLParams() {
  const url = new URL(window.location.href)
}

main()
