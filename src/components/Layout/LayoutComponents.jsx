import React from 'react'
import HeaderComponets from './HeaderComponets'
import FooterComponents from './FooterComponents'

const LayoutComponents = ({children}) => {
  return (
    <>
      <HeaderComponets />
      <main className=''>{children}</main>
      <FooterComponents />
    </>
  )
}

export default LayoutComponents
