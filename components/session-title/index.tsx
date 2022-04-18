import React from 'react'
import { ITitle } from 'interface/index.d'

export default function SessionTitle({titlePosition = 'center', title}: ITitle) {
  if(!title) return null
  return (
    <h3 className={`session-title text-align-${titlePosition}`}>{title}</h3>
  )
}