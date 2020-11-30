export const initialStateMessage = {
  show: false,
  message: '',
  severity: 'error',
}

export const errorBadFormat = {
  show: true,
  message: 'No es un archivo válido',
  severity: 'error',
}

export const errorBadFormatNotPublicKey = {
  show: true,
  message: 'Falta la llave pública',
  severity: 'error',
}

export const successLoaded = {
  show: true,
  message: 'Archivo cargado',
  severity: 'success',
}