import React, { useState } from 'react'
import './SearchBtn.css'

function SearchBtn({id,text,onClick}) {
  return (
    <div>
      <button id={id} onClick={onClick}>{text}</button>
    </div>
  )
}

export default SearchBtn
