import React from 'react'
import './SearchInput.css'

function SearchInput({id,placeholder,value,onInputChange}) {
    const handleChange = (event) => {
        onInputChange(event.target.value);
      };
  return (
    <div>
      <input type="text" id={id} placeholder={placeholder} value={value} onChange={handleChange}/>
    </div>
  )
}

export default SearchInput

