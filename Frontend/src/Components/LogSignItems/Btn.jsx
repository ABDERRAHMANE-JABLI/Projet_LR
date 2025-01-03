import React from 'react'

const Btn = (props) => {
  return (
    <div className="col-12 mt-2">
        <button className={`btn d-block btn-user w-100 ${props.text === 'Continuer Avec Google' ? 'btn-outline-danger' : 'btn-outline-primary'}`} type="submit" id={props.id}>{props.children}&nbsp;{props.text}</button>
    </div>
  )
}

export default Btn