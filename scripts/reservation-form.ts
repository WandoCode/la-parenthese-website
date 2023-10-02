import { ValidationError } from 'yup'
import { formOneSchema, formTwoSchema } from './form-schemas'
import { FormObject, FormatedErrors } from '../interfaces/Forms'

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

const stepTwoFormBackBtn = document.getElementById(
  'client-infos-form__back'
) as HTMLButtonElement

const stepThreeSection = document.getElementsByClassName(
  'reservation__step-three'
)[0] as HTMLElement

let reservation: FormObject = {}
stepOneForm.onsubmit = handleStepOneFormSubmit
stepTwoForm.onsubmit = handleStepTwoFormSubmit

stepTwoFormBackBtn.onclick = (e) => {
  e.preventDefault()
  displayNextStepForm(stepTwoSection, stepOneSection)
}

function handleStepOneFormSubmit(e) {
  e.preventDefault()

  const formData = new FormData(stepOneForm)
  if (!formData.get('cadeau')) formData.set('cadeau', 'false')
  const formObject = formDataToFormatedObject(formData)

  if (formObject.date)
    formObject.date = castDateFromString(formObject.date) || ''

  const errors = validateStepOne(formObject)
  if (errors) return showErrorsOnForm(errors, formData)

  // No error
  reservation = { ...formObject }
  displayNextStepForm(stepOneSection, stepTwoSection)
}

function handleStepTwoFormSubmit(e) {
  e.preventDefault()

  const formData = new FormData(stepTwoForm)

  // Unchecked checkbox does not appear into the formData object...
  if (!formData.get('confidentialite')) formData.set('confidentialite', 'false')
  if (!formData.get('conditions_ventes'))
    formData.set('conditions_ventes', 'false')

  const formObject = formDataToFormatedObject(formData)
  console.log(formObject)
  const errors = validateStepTwo(formObject)
  if (errors) return showErrorsOnForm(errors, formData)

  reservation = { ...reservation, ...formObject }
  displayNextStepForm(stepTwoSection, stepThreeSection)
  sendReservation(reservation)
}

function formDataToFormatedObject(formData: FormData) {
  const formObject: FormObject = {}
  formData.forEach((val, key) => (formObject[key] = val as string))

  return formObject
}

function castDateFromString(date: string | Date) {
  if (typeof date !== 'string') return
  return new Date(
    parseInt(date.split('/')[2]),
    parseInt(date.split('/')[1]),
    parseInt(date.split('/')[0])
  )
}

function validateStepOne(form: FormObject) {
  try {
    formOneSchema.validateSync(form, { abortEarly: false })
  } catch (error) {
    if (error instanceof ValidationError)
      return formatErrorsFromValidationError(error)
    else throw error
  }
}

function validateStepTwo(formObject: FormObject) {
  try {
    formTwoSchema.validateSync(formObject, { abortEarly: false })
  } catch (error) {
    if (error instanceof ValidationError)
      return formatErrorsFromValidationError(error)
    else throw error
  }
}

function displayNextStepForm(
  currentStepElement: HTMLElement,
  nextStepElement: HTMLElement
) {
  currentStepElement.style.display = 'none'
  nextStepElement.style.display = 'block'
}

function showErrorsOnForm(errors: FormatedErrors, formData: FormData) {
  for (const fieldName of formData.keys()) {
    const fieldElement = document.getElementsByName(fieldName)[0]

    // Catch choices elements that are styled if needed
    const element = fieldElement.classList.contains('choices__input')
      ? fieldElement.parentElement
      : fieldElement

    if (Object.keys(errors).includes(fieldName)) {
      const errorMessage = errors[fieldName]

      element?.classList.add('invalid')
      element?.setAttribute('data-error', errorMessage)
    } else {
      element?.classList.remove('invalid')
      element?.removeAttribute('data-error')
    }
  }
}

function sendReservation(reservation) {
  // TODO: envoyer le mail à Charlotte + confirmation au client
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
