interface ReservationOptions {
  startHour: number
  endHour: number
  disabledWeekDays: number[]
  customDisabledDates: string[]
  defaultHour: number
  defaultMin: number
}

const reservationOptions: ReservationOptions = {
  startHour: 9,
  endHour: 18,
  disabledWeekDays: [6, 0], // 0-6; week start at 0 = sunday
  customDisabledDates: ['18-9-2023'], // format: d-m-yyyy ('d' and 'm' are integer). Ex: '1-8-2023' (not '01-08-2023')
  defaultHour: 17,
  defaultMin: 30,
}

export { reservationOptions }
// TODO: voir avec Charlotte les dates à rendre indisponibles
// TODO: Voir avec Charlotte les heures à activer
