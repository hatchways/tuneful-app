import React from 'react'
import './Utils.css'

export default function Required({ className, ...props }) {
    return (
      <span className={['Required', className].join(' ')} {...props}>
        &#42;
      </span>
    )
  }