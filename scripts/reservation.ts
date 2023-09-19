import AirDatepicker, { AirDatepickerViewsSingle } from 'air-datepicker'
import localeFr from 'air-datepicker/locale/fr'
import 'air-datepicker/air-datepicker.css'
import { reservationOptions as opts } from './options'

import Choices from 'choices.js'
import 'choices.js/public/assets/styles/choices.css'

const massageChoiceForm = document.getElementById(
  'massage-choice-form'
) as HTMLFormElement

const customerDetailsForm = document.getElementById(
  'client-infos-form'
) as HTMLFormElement

const reservationCheckoutList = document
  .getElementById('reservation-checkout')
  ?.getElementsByTagName('span') as HTMLCollectionOf<HTMLSpanElement>

function main() {
  initDateTimePickers()
  initSelectMassageField()
  initSelectLocalityField()
}

function initSelectLocalityField() {
  const localiteEl = customerDetailsForm.elements['localite']

  const choices = new Choices(localiteEl, {
    choices: opts.localites,
    allowHTML: false,
    itemSelectText: '',
  })
}

function initDateTimePickers() {
  new AirDatepicker('#date', {
    selectedDates: [new Date()],
    locale: localeFr,
    onRenderCell({ date, cellType }) {
      disableDates(cellType, date)
    },
  })

  new AirDatepicker('#heure', {
    locale: localeFr,
    timepicker: true,
    minHours: 9,
    maxHours: 18,
    minutesStep: 15,
    onlyTimepicker: true,
    selectedDates: [new Date().setHours(opts.defaultHour, opts.defaultMin, 0)],
  })
}

function disableDates(cellType: AirDatepickerViewsSingle, date: Date) {
  if (cellType === 'day') {
    const dayIsdisabled = isDateFlaggedAsDisabled(date)
    if (dayIsdisabled) {
      return {
        disabled: true,
        classes: 'disabled-class',
        attrs: {
          title: 'Cell is disabled',
        },
      }
    }
  }
}

function isDateFlaggedAsDisabled(date: Date) {
  return (
    opts.disabledWeekDays.includes(date.getDay()) ||
    opts.customDisabledDates.includes(
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    )
  )
}

function getMassageFromURLParams() {
  const url = new URL(window.location.href)
  const params = url.searchParams
  const massage = params.get('massage')

  return massage
}

function initSelectMassageField() {
  const selectEl = massageChoiceForm.elements['massage'] as HTMLSelectElement

  selectEl.addEventListener('change', handleSelectMassageChange)

  const choices = new Choices(selectEl, {
    choices: opts.massages,
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: '',
  })

  const massageChoiceValue = getMassageFromURLParams()
  const massage = getMassageFromMassageValue(massageChoiceValue)

  if (massage) {
    choices.setChoiceByValue(massage.value)
    showMassageShort(massage)
  }
}

function handleSelectMassageChange(e: Event) {
  const target = e.target as HTMLSelectElement

  const massageChoiceValue = target.value
  const massage = getMassageFromMassageValue(massageChoiceValue)
  if (massage) showMassageShort(massage)
}

function getMassageFromMassageValue(massageValue: string | null) {
  return opts.massages.find((massage) => massage.value === massageValue)
}

function showMassageShort(massage: (typeof opts.massages)[0]) {
  reservationCheckoutList[0].innerText = massage.label
  reservationCheckoutList[1].innerText = massage.customProperties?.duration
  reservationCheckoutList[2].innerText = massage.customProperties?.price
}
main()
