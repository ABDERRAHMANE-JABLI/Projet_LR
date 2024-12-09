import React from 'react'

const EventCard = ({ image, link, title, author, location, date }) => {
  return (
        <div className="swiper-slide">
          <div className="card">
            <a href={link}><img src={image} className="card-img-top" alt="event" /></a>
            <div className="card-body p-0">
              <a href={link}>
                <h5 className="card-title pt-4">{title}</h5>
              </a>
              <p className="card-text">Par : {author}</p>
              <div className="card-text">
                <ul className="d-flex">
                  <li className="residence-list">
                    <img src="images/position.png" alt="location icon" /> {location}
                  </li>
                  <li className="residence-list">
                    <img src="images/calender.png" alt="calendar icon" /> {date}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EventCard