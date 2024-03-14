import React from 'react'
const ano = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className='flex items-center justify-center w-screen py-6 border-t'>
      <div className='text-center'>
      <p className='font-semibold text-gray-600'>Pytter Burguer {ano} todos os direitos reservados! </p>
      <p>feito por <a href="https://api.whatsapp.com/send?phone=5531992311170&text=ola,%20vim%20pelo%20site%20do%20pytter%20burguer" target='_blanck' className='underline text-blue-700'>Klenilson Developer</a></p>
      </div>
    </footer>
  )
}


export default Footer
