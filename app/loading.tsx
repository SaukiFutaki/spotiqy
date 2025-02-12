import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
  return (
    <div className='bg-black m-20'>
        <Skeleton className="w-full h-screen " />

    </div>
  )
}
