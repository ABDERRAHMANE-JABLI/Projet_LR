import React from "react";

const SectionInfos = () => {
  return (
    <section id="start">
      <div className="container my-5 py-5">
        <div className="row featurette py-lg-5 ">
          <div className="col-md-5 order-md-1 d-flex">
            <h1 className="text-capitalize  lh-1 mb-3">
              Votre réseau d'opportunités commence ici.
            </h1>
          </div>
          <div className="col-md-7 order-md-2">
            <div className="text-content ps-md-5 mt-4 mt-md-0">
              <p className="py-lg-2">
                Connect-LR est une plateforme collaborative conçue pour offrir
                aux étudiants un accès direct aux retours d'expérience des
                anciens élèves, les aider à valider leurs choix d'études et à
                bâtir un avenir professionnel éclairé
              </p>
              <a href="/index" className="btn btn-primary btn-lg px-4 me-md-2">
                Se Connecter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionInfos;
