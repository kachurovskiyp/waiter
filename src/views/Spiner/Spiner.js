import Spinner from 'react-bootstrap/Spinner';

import React from 'react'

const Spiner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Spiner