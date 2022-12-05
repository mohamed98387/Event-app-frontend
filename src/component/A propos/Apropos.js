import React from "react";
import "./Apropos.css";
const Apropos = props => (
  <section id="about">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h2>À PROPOS ÉVÈNEMENT</h2>
          <p>
            Aujourd’hui beaucoup de gens cherchent un moyen pour se divertir,
            s’amuser ou pour accueillir des nouvelles connaissances. ce site
            paermet de te présenter des événements de types différents et
            d’autres services complémentaires destinés aux simples visiteurs et
            aux participants pour qu’ils bénéficient de ses avantages.
          </p>
        </div>
        <div className="col-lg-3">
          <h3>pays</h3>
          <p>Tunisie</p>
        </div>
        <div className="col-lg-3">
          <h3>QUAND</h3>
          <p>
            Du lundi au Dimanche
            <br />
            Janvier au December{" "}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Apropos;
