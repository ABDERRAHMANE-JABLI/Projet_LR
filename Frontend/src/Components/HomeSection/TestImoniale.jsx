import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./testimoniale.css";

// Import de l'image des guillemets
import quoteImage from "../../images/qucote.png"; // Assure-toi que le chemin est correct

const testimonials = [
  {
    id: 1,
    text: "J'ai pu discuter avec un ancien étudiant de mon programme. Ses conseils m'ont aidée à choisir un stage qui correspond parfaitement à mes aspirations professionnelles.",
    author: "Lisa Joe",
    position: "Étudiante, L2",
  },
  {
    id: 2,
    text: "Partager mon expérience sur cette plateforme m'a permis de guider des étudiants et de leur éviter les erreurs que j'avais commises. C'est gratifiant de pouvoir redonner à la communauté.",
    author: "Abdell JABLI",
    position: "Ancien Étudiant",
  },
];

const Testimonial = () => {
  return (
    <section id="testimonial" className="testimonial-section">
      <div className="container">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonial-slide">
                {/* Ajout de l'image des guillemets */}
                <img
                  src={quoteImage}
                  alt="Quote"
                  className="quote-image"
                />
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-author">
                  <p className="author-name">{item.author}</p>
                  <p className="author-position">{item.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
