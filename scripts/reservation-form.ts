import {
  object,
  string,
  number,
  date,
  InferType,
  ValidationError,
  boolean,
} from 'yup'
import { reservationOptions as opts } from './options'

interface FormObject {
  date: string | Date
  heure: string
  massage: string
  gift: boolean
}

const stepOneSection = document.getElementsByClassName(
  'reservation__step-one'
)[0] as HTMLElement

const stepOneForm = document.getElementById(
  'massage-choice-form'
) as HTMLFormElement

const stepTwoSection = document.getElementsByClassName(
  'reservation__step-two'
)[0] as HTMLElement

const stepTwoForm = document.getElementById(
  'client-infos-form'
) as HTMLFormElement

const stepThreeSection = document.getElementsByClassName(
  'reservation__step-three'
)[0] as HTMLElement

stepOneForm.onsubmit = (e) => {
  e.preventDefault()
  const formData = new FormData(stepOneForm)
  const formObject = formDataToFormatedObject(formData)

  const errors = validateStepOne(formObject)

  if (errors === null) return
  if (errors) {
    for (const fieldName of formData.keys()) {
      const fieldElement = document.getElementsByName(fieldName)[0]
      if (Object.keys(errors).includes(fieldName)) {
        const errorMessage = errors[fieldName]
        fieldElement.classList.add('invalid')
        fieldElement.setAttribute('data-error', errorMessage)
      } else {
        fieldElement.classList.remove('invalid')
        fieldElement.removeAttribute('data-error')
      }
    }
    return
  }
  displayNextStepForm(stepOneSection, stepTwoSection)
}

stepTwoForm.onsubmit = (e) => {
  e.preventDefault()

  const form = new FormData(stepTwoForm)
  const errors = validateStepTwo(form)

  displayNextStepForm(stepTwoSection, stepThreeSection)
}

function formDataToFormatedObject(formData: FormData) {
  const formObject = {} as FormObject
  formData.forEach((val, key) => (formObject[key] = val))
  formObject.date = castDateFromString(formObject.date) || ''

  return formObject
}

function displayNextStepForm(
  currentStepElement: HTMLElement,
  nextStepElement: HTMLElement
) {
  currentStepElement.style.display = 'none'
  nextStepElement.style.display = 'block'
}

function validateStepOne(form: {}) {
  try {
    formOneSchema.validateSync(form, { abortEarly: false })
    return null
  } catch (error) {
    if (error instanceof ValidationError)
      return formatErrorsFromValidationError(error)
    else throw error
  }
}

function validateStepTwo(form: FormData) {}

function castDateFromString(date: string | Date) {
  if (typeof date !== 'string') return
  return new Date(
    parseInt(date.split('/')[2]),
    parseInt(date.split('/')[1]),
    parseInt(date.split('/')[0])
  )
}
/* 
  Transform the ValidationError object into 
  {
    fieldName: 'error massage', ...
  } 
*/
function formatErrorsFromValidationError(errors: ValidationError) {
  const formatedErrors = {}
  errors.inner.forEach((err) => {
    if (err.path) formatedErrors[err.path] = err.message
  })
  return formatedErrors
}

const formOneSchema = object({
  date: date().required(),
  heure: string()
    .required()
    .length(5)
    .matches(/\d\d:\d\d/)
    .test(
      'is-hours',
      'The given string does not match the format HH:MM (H is between the opening hours and M between 0 and 59',
      (value) => {
        const [hourStr, minStr] = value.split(':')
        const [hour, min] = [parseInt(hourStr, 10), parseInt(minStr, 10)]

        return (
          hour >= opts.startHour && hour <= opts.endHour && min >= 0 && min < 60
        )
      }
    ),
  massage: string().required(),
  cadeau: boolean().required(),
})
