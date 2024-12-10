import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "@fortawesome/fontawesome-free/css/all.min.css";

import event1 from "../../images/1.png";
import event2 from "../../images/2.png";
import event3 from "../../images/3.png";
import event4 from "../../images/4.png";

// Exemple de données pour les cartes
const events = [
  {
    id: 1,
    title: "Prise de Parole En Public",
    author: "Abdell JABLI",
    date: "15-12-2024",
    location: "ORB-300 LR",
    image: event1,
  },
  {
    id: 2,
    title: "Ton Réseau Linkedin",
    author: "Mahamat Hassan",
    date: "20-12-2024",
    location: "Pascal-18 LR",
    image: event2,
  },
  {
    id: 3,
    title: "Prise de Parole En Public",
    author: "James Rambauch",
    date: "28-12-2024",
    location: "à Distance",
    image: event3,
  },
  {
    id: 4,
    title: "Ton Entretien D'embauche",
    author: "James Melot",
    date: "23-01-2025",
    location: "à Distance",
    image: event4,
  },
];

const EventSlider = () => {
  return (
    <div style={{ width: "85%", margin: "0 auto", padding: "20px 0" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div
              style={{
                borderRadius: "15px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                backgroundColor: "inherit",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    color: "white",
                  }}
                >
                  <strong>Par :</strong> {event.author}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="d-flex"
                    style={{
                      fontSize: "16px",
                      color: "white",
                    }}
                  >
                    <i className="fas fa-map-marker-alt" style={{ marginRight: "10px", color: "#0f6eb1", fontSize:"18px" }}></i> {event.location}
                  </p>
                  <p className="d-flex"
                    style={{fontSize: "16px", color: "white" }}
                  >
                    <i className="fas fa-calendar-alt" style={{ marginRight: "10px", color: "#0f6eb1", fontSize:"18px" }}></i> {event.date}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;
