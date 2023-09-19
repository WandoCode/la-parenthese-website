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

interface FormatedErrors {
  [key: string]: string
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
  if (!formData.get('cadeau')) formData.set('cadeau', 'false')
  const formObject = formDataToFormatedObject(formData)
  formObject.date = castDateFromString(formObject.date) || ''

  const errors = validateStepOne(formObject)
  if (errors) return showErrorsOnForm(errors, formData)

  // No error
  displayNextStepForm(stepOneSection, stepTwoSection)
}

stepTwoForm.onsubmit = (e) => {
  e.preventDefault()

  const formData = new FormData(stepTwoForm)
  if (!formData.get('confidentialite')) formData.set('confidentialite', 'false')
  if (!formData.get('conditions_ventes'))
    formData.set('conditions_ventes', 'false')

  const formObject = formDataToFormatedObject(formData)

  const errors = validateStepTwo(formObject)
  if (errors) return showErrorsOnForm(errors, formData)

  displayNextStepForm(stepTwoSection, stepThreeSection)
}

function showErrorsOnForm(errors: FormatedErrors, formData: FormData) {
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
}

function formDataToFormatedObject(formData: FormData) {
  const formObject: any = {}
  formData.forEach((val, key) => (formObject[key] = val))

  return formObject
}

function displayNextStepForm(
  currentStepElement: HTMLElement,
  nextStepElement: HTMLElement
) {
  currentStepElement.style.display = 'none'
  nextStepElement.style.display = 'block'
}

function validateStepOne(form: Record<string, string>) {
  try {
    formOneSchema.validateSync(form, { abortEarly: false })
  } catch (error) {
    if (error instanceof ValidationError)
      return formatErrorsFromValidationError(error)
    else throw error
  }
}

function validateStepTwo(formObject: Record<string, string>) {
  try {
    formTwoSchema.validateSync(formObject, { abortEarly: false })
  } catch (error) {
    if (error instanceof ValidationError)
      return formatErrorsFromValidationError(error)
    else throw error
  }
}

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
  const formatedErrors: FormatedErrors = {}
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
  cadeau: string(),
})

const formTwoSchema = object({
  nom: string().required().max(30),
  prenom: string().required().max(30),
  email: string().email().required().max(30),
  tel: string().required().max(15).matches(/\d*/),
  localite: string().required(),
  confidentialite: string()
    .required()
    .test(
      'is-confidentailite',
      'User have to accept confidantiality contract',
      (val) => val === 'true'
    ),
  conditions_ventes: string()
    .required()
    .test(
      'is-conditions_ventes',
      'User have to accept service contract',
      (val) => val === 'true'
    ),
})
