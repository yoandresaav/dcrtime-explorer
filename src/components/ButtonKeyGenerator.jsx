import React from 'react'
import Button from '@material-ui/core/Button';

import {
  generateKey, exportPrivateCryptoKey, exportPublicCryptoKey
} from '../helpers/utils-keys'

const ButtonKeyGenerator = ({addKeys}) => {

  const onClick = async () => {
    const key = await generateKey()
    
    const pemPrivate = await exportPrivateCryptoKey(key.privateKey)
    const pemPublic = await exportPublicCryptoKey(key.publicKey)
    const store = {
      key,
      pemPublic,
      pemPrivate,
    }
    addKeys(store)
  }
  return (
    <Button variant="contained" color="secondary" onClick={onClick} >
      Crear Llaves
    </Button>
  )
}

export default ButtonKeyGenerator