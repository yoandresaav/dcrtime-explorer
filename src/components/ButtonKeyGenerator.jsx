import React from 'react'
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
    <button onClick={onClick} type="button">Genera llaves</button>
  )
}

export default ButtonKeyGenerator