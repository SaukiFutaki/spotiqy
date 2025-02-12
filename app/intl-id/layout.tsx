import React from 'react'

export default function layout({ children }  : { children: React.ReactNode }) {
  return (
    <div className='bg-[#111111] w-full h-full'>
      {children}
    </div>
  )
}
