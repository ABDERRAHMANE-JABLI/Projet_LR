import React from 'react'
import EventSlider from "./EventSlider"

const Event = () => {
  return (
    <section id="residence">
  <div className="container my-5 py-5">
    <h2 className="text-capitalize m-0 py-lg-5">Evénements à Venir</h2>
    <EventSlider/>
  </div>
</section>

  )
}

export default Event