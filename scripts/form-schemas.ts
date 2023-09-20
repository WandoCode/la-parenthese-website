import { object, string, date } from 'yup'
import { reservationOptions as opts } from './options'

export const formOneSchema = object({
  date: date().required(),
  heure: string()
    .required()
    .length(5)
    .matches(/\d\d:\d\d/)
    .test('is-hours', 'hours format/value is wrong.', (value) => {
      const [hourStr, minStr] = value.split(':')
      const [hour, min] = [parseInt(hourStr, 10), parseInt(minStr, 10)]

      return (
        hour >= opts.startHour && hour <= opts.endHour && min >= 0 && min < 60
      )
    }),
  massage: string().required(),
  cadeau: string(),
})

export const formTwoSchema = object({
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
