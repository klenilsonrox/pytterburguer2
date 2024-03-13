import React, { useContext } from 'react'
import { dadosContext } from './DadosProvider'

const Header = () => {
const inf = useContext(dadosContext)
console.log(inf.cart)

  return (
    
  )
}

export default Header
