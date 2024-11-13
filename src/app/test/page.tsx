import BurnerLoader from '@/components/atoms/lotties/loader'
import React from 'react'

const TestPage = () => {
  return (
    <div style={
      {
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }>
      <BurnerLoader />

      
    </div>
  )
}

export default TestPage
