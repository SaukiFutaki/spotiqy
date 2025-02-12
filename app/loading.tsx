import { CircularBarsSpinnerLoader } from '@/components/cuicui/circular'

export default function loading() {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-black'>
        <CircularBarsSpinnerLoader />

    </div>
  )
}
