import React from 'react'
import PartnerCard from './PartnerCard'
import c1 from "../../images/c1.png"
import c2 from "../../images/c2.png"
import c3 from "../../images/c3.png"
import c4 from "../../images/c4.png"
import c5 from "../../images/c5.png"


const Partner = () => {
    return (
        <section id="feature">
            <div className="container py-5">
                <div className="row">
                    <div className="section-header align-center mb-5">
                        <h2 className="text-capitalize m-0">Nos Partenaires</h2>
                    </div>
                </div>
                <div className="row d-flex justify-content-between">
                    <PartnerCard image={c1} />
                    <PartnerCard image={c2} />
                    <PartnerCard image={c3} />
                    <PartnerCard image={c4} />
                    <PartnerCard image={c5} />
                </div>
            </div>
        </section>
    )
}

export default Partner