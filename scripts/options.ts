import { Choice, Item } from 'choices.js'

interface ReservationOptions {
  startHour: number
  endHour: number
  disabledWeekDays: number[]
  customDisabledDates: string[]
  defaultHour: number
  defaultMin: number
  massages: Choice[]
  localites: Item[]
}

const reservationOptions: ReservationOptions = {
  startHour: 9,
  endHour: 18,
  disabledWeekDays: [6, 0], // 0-6; week start at 0 = sunday
  customDisabledDates: ['18-9-2023'], // format: d-m-yyyy ('d' and 'm' are integer). Ex: '1-8-2023' (not '01-08-2023')
  defaultHour: 17,
  defaultMin: 30,
  massages: [
    {
      label: 'Choisir',
      value: '',
      selected: true,
      disabled: true,
    },
    {
      label: 'Cinq continents',
      value: 'massage1',
      customProperties: { duration: '1h30', price: 90 },
    },
    {
      label: 'Power legs',
      value: 'massage2',
      customProperties: { duration: '1h', price: 65 },
    },
    {
      label: 'Power legs + booty',
      value: 'massage3',
      customProperties: { duration: '1h20', price: 85 },
    },
  ],
  localites: [
    {
      label: 'Belgique',
      value: '',
      choices: [
        { label: 'Tournai', value: 'tournai' },
        { label: 'Antoing', value: 'antoing' },
        { label: 'Brunehaut', value: 'brunehaut' },
        { label: 'Rumes', value: 'rumes' },
        { label: 'Estaimpuis', value: 'estaimpuis' },
        { label: 'Pecq', value: 'pecq' },
        { label: 'Celles', value: 'celles' },
      ],
    },
    {
      label: 'France',
      value: '',
      choices: [
        { label: 'Aix-en-Pévèle', value: 'aix-en-pevele' },
        { label: 'Orchies', value: 'orchies' },
        { label: 'Nomain', value: 'nomain' },
        { label: 'Auchy-lez-Orchies', value: 'auchy-lez-orchies' },
        { label: 'Mouchin', value: 'mouchin' },
        { label: 'Bachy', value: 'bachy' },
        { label: 'Wannehain', value: 'wannehain' },
        { label: 'Corbieux', value: 'corbieux' },
        { label: 'Genech', value: 'genech' },
        { label: 'Camphin-en-Pévèle', value: 'camphin-en-pevele' },
        { label: 'Bourghelles', value: 'bourghelles' },
        { label: 'Cysoing', value: 'cysoing' },
        { label: 'Bouvines', value: 'bouvines' },
        { label: 'Baisieux', value: 'baisieux' },
        { label: 'Willems', value: 'willems' },
        { label: 'Chéreng', value: 'chereng' },
      ],
    },
  ],
}

export { reservationOptions }
// TODO: voir avec Charlotte les dates à rendre indisponibles
// TODO: Voir avec Charlotte les heures à activer
// TODO: Voir avec Charlotte pour qu'elle recherche les code postaux. Les mettre en 'value' pour qu'ils soient pris en compte lors de la recherche si l'utilisateur tape le CP au lieux de la commune
