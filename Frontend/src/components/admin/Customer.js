import React from 'react'
import Sidebar from './Sidebar'
import Stack from 'react-bootstrap/Stack';
const Customer = () => {
  return (
    <>
    <Stack direction="horizontal">
      <div><Sidebar/></div>
      <div>
        Customers
      </div>
      </Stack>
    </>
  )
}

export default Customer
