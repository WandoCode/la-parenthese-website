export interface FormatedErrors {
  [key: string]: string
}

export interface FormObject {
  date?: Date | ''
  nom?: string
  prenom?: string
  heure?: string
  massage?: string
  localite?: string
  confidentialite?: boolean
  cadeau?: boolean
  conditions_ventes?: boolean
}
