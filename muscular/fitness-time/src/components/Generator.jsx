import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import Button from './Button'
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
  const { muscles, setMuscles, poison, setPoison, goal, setGoal} = props
  const [showModal, setShowModal] = useState(false)
  // let showModal = false /* lets you show which section you've pressed*/, this essentially does the same thing as the line above, but the one above uses useStates to update
  //and therefore lets the user update the code in real time, this would be called a "stateful" variable
  


  function toggleModal() {
    setShowModal = !showModal /* This doesn't do anything when we press since it won't update without useState imported, any user interaction has useState used*/
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup))
      return
    }

    if (muscles.length > 3) {
      return /* too many muscles*/
    }
    if (poison !== 'individual') {
      setMuscles([muscleGroup])
      setShowModal(false)
      return
    }

    setMuscles([...muscles, muscleGroup])
    if (muscles.length === 2) {
      setShowModal(false)
    }
  }

  return (
    <SectionWrapper header={"generate your workout"} title={['It\'s', 'Huge', 'o\'clock']}> {/* the spans and \' are for exiting the ' limits*/}
      <Header index={'01'} title={'Pick your poison'} description={"Select the workout you wish to endure."} />
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      {Object.keys(WORKOUTS).map((type, typeIndex) => {
        return (
          <button onClick={() => {setMuscles([]), setPoison(type)}} className={'bg-slate-950 border border-blue-400 py-4 duration-200 px-4 hover:border-blue-600 rounded-lg ' + (type === poison ? ' border-blue-600 ' : ' border-blue-400')} key={typeIndex}>
            <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
          </button>
        )
      })}
      </div>
       <Header index={'02'} title={'Lock on targets'} description={"Select the muscles judged for annihilation."} />
       <div className='bg-slate-950  border border-solid border-blue-400 rounded-lg flex flex-col'>
          <button onClick={toggleModal} className='relative p-3 flex items-center justify-center'> {/*onClick is an event that causes toggleModal */}
          <p className='capitalize'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down p-3"></i> {/* down arrow*/}
        </button>
        {showModal && (<div className='flex flex-col px-3 pb-3'>
          {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                return (
                <button onClick={() => {updateMuscles(muscleGroup)

                }}key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                </button>
            )
          })} {/* if poison is individual, return the workouts in poison, else the keys in the poison type*/}
        </div>)} {/* when showModal is true, the inside will show*/}
        
      </div>
      <Header index={'03'} title={'Become Juggernaut'} description={"Select your ultimate objective."} />
      <div className='grid grid-cols-3 gap-4'> {/* grid-cols decides the number of cols in the grid */}
      {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
        return (
          <button onClick={() => {setGoal(scheme)}} className={'bg-slate-950 border border-blue-400 py-4 px-4 duration-200 hover:border-blue-600 rounded-lg ' + (scheme === goal ? ' border-blue-600 ' : ' border-blue-400')} key={schemeIndex}>
            <p className='capitalize'>{scheme.replaceAll('_', ' ')}</p>
          </button>
        )
      })}
      </div>
      <Button text={"Formulate"}> </Button>
    </SectionWrapper>
  )
}
