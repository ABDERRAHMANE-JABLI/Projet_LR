import React from 'react'
//import EventCard from './EventCard'
import event1 from "../../images/1.png"
import event2 from "../../images/2.png"
import event3 from "../../images/3.png"
import event4 from "../../images/4.png"

/*
const Event = () => {
  return (
    <section id="residence">
    <div className="container my-5 py-5">
      <h2 className="text-capitalize m-0 py-lg-5">Evénements à Venir</h2>
  
      <div className="swiper-button-next residence-swiper-next residence-arrow"></div>
      <div className="swiper-button-prev residence-swiper-prev residence-arrow"></div>
  
      <div className="swiper residence-swiper">
        <div className="swiper-wrapper">
          <EventCard
            image={event1}
            link="index.html"
            title="Comment Créer ton CV"
            author="Abdell JABLI"
            location="à Distance"
            date="20-12-2024"
          />
          <EventCard 
            image={event2}
            link="index.html"
            title="Ton Réseau Linkedin"
            author="Mahammat Hassan"
            location="Pas-000 LR"
            date="18-12-2024"
          />
          <EventCard 
            image={event3}
            link="index.html"
            title="Prise de Parole En Public"
            author="James Rambauch"
            location="à Distance"
            date="23-12-2024"
          />
          <EventCard 
            image={event4}
            link="index.html"
            title="Préparation Entretien D'embauche"
            author="Malika Lisa"
            location="à Distance"
            date="01-01-2025"
          />
        </div>
      </div>
  
      <div className="residence-btn">
        <a href="index.html" className="btn btn-primary btn-lg my-5">Tous les Evénments</a>
      </div>
    </div>
  </section>
  )
}

export default Event
*/

const Event = () => {
  return (
    <section id="residence">
  <div className="container my-5 py-5">
    <h2 className="text-capitalize m-0 py-lg-5">Evénements à Venir</h2>

    <div className="swiper-button-next residence-swiper-next residence-arrow"></div>
    <div className="swiper-button-prev residence-swiper-prev residence-arrow"></div>

    <div className="swiper residence-swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="card">
            <a href="index.html"><img src={event1} className="card-img-top" alt="event" /></a>
            <div className="card-body p-0">
              <a href="index.html">
                <h5 className="card-title pt-4">Comment Créer ton CV</h5>
              </a>
              <p className="card-text">Par Abdell JABLI</p>
              <div className="card-text">
                <ul className="d-flex">
                  <li className="residence-list">
                    <img src="images/position.png" alt="location icon" /> à Distance
                  </li>
                  <li className="residence-list">
                    <img src="images/calender.png" alt="calendar icon" /> 20-12-2024
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper-slide">
          <div className="card">
            <a href="index.html"><img src={event2} className="card-img-top" alt="event" /></a>
            <div className="card-body p-0">
              <a href="index.html">
                <h5 className="card-title pt-4">Ton Réseau Linkedin</h5>
              </a>
              <p className="card-text">Par Mahammat Hassan</p>
              <div className="card-text">
                <ul className="d-flex">
                  <li className="residence-list">
                    <img src="images/position.png" alt="location icon" /> Pas-000 LR
                  </li>
                  <li className="residence-list">
                    <img src="images/calender.png" alt="calendar icon" /> 18-12-2024
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper-slide">
          <div className="card">
            <a href="index.html"><img src={event3} className="card-img-top" alt="event" /></a>
            <div className="card-body p-0">
              <a href="index.html">
                <h5 className="card-title pt-4">Prise de Parole En Public</h5>
              </a>
              <p className="card-text">James Rambauch</p>
              <div className="card-text">
                <ul className="d-flex">
                  <li className="residence-list">
                    <img src="images/position.png" alt="location icon" /> à Distance
                  </li>
                  <li className="residence-list">
                    <img src="images/calender.png" alt="calendar icon" /> 23-12-2024
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper-slide">
          <div className="card">
            <a href="index.html"><img src={event4} className="card-img-top" alt="event" /></a>
            <div className="card-body p-0">
              <a href="index.html">
                <h5 className="card-title pt-4">Préparation Entretien D'embauche</h5>
              </a>
              <p className="card-text">Malika Lisa</p>
              <div className="card-text">
                <ul className="d-flex flex-row justify-content-between">
                  <li className="residence-list">
                    <img src="images/position.png" alt="location icon" /> à Distance
                  </li>
                  <li className="residence-list">
                    <img src="images/calender.png" alt="calendar icon" /> 01-01-2025
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="residence-btn">
      <a href="index.html" className="btn btn-primary btn-lg my-5">Tous les Evénments</a>
    </div>
  </div>
</section>

  )
}

export default Event