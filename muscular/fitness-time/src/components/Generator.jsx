import React from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'

function Header(props) {
  const { index, title, description } = props
  return ( /* The following just groups together the generator phrases and applies tailwind css to each one*/
      <div className='flex flex-col gap-4'> 
        <div className='flex items-center justify-center gap-2'>
          <p className='text-3xl sm:text-4 md:text-5xl font-semibold text-slate-400'>{index}</p>
          <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
        </div>
        <p className='text-sm sm:text-base mx-auto'>{description}</p>
      </div>
  )
}

export default function Generator() {
  return (
    <SectionWrapper header={"generate your workout"} title={['It\'s', 'Huge', 'o\'clock']}> {/* the spans and \' are for exiting the ' limits*/}
      <Header index={'01'} title={'Pick your poison'} description={"Select the workout you wish to endure."} />
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      {Object.keys(WORKOUTS).map((type, typeIndex) => {
        return (
          <button className='bg-slate-950 border border-blue-400 py-4 duration-200 hover:border-blue-600 rounded-lg' key={typeIndex}>
            <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
          </button>
        )
      })}
      </div>
      <Header index={'02'} title={'Lock on targets'} description={"Select the muscles judged for annihilation."} />
      <div className='bg-slate-950 py-3 border border-solid border-blue-400 rounded-lg p-3'>
        <div className='relative flex items-center justify-center'>
          <p>Select muscle groups</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i> {/* down arrow*/}
        </div>
      
      </div>
    </SectionWrapper>
  )
}
