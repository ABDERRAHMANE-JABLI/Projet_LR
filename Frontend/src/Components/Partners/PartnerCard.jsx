import React from 'react'

const PartnerCard = ({image}) => {
  return (
    <div className="col-md-2">
      <div 
        className="my-3" 
        role="group" 
        aria-label="3 / 7" 
        style={{ width: "160px", marginRight: "20px" }}
      >
        <img alt="card" src={image} />
      </div>
    </div>
  )
}

export default PartnerCard