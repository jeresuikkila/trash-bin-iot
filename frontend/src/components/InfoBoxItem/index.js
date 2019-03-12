import React from 'react';
import './styles.css'
import biowasteOK from '../../static/biowaste-ok.png';
import cardboardOK from '../../static/cardboard-ok.png';
import metalOK from '../../static/metal-ok.png';
import generalOK from '../../static/general-ok.png';
import glassOK from '../../static/glass-ok.png';
import plasticOK from '../../static/plastic-ok.png';
import biowasteFull from '../../static/biowaste-full.png';
import cardboardFull from '../../static/cardboard-full.png';
import metalFull from '../../static/metal-full.png';
import generalFull from '../../static/general-full.png';
import glassFull from '../../static/glass-full.png';
import plasticFull from '../../static/plastic-full.png';
import alert from '../../static/alert.png';

const iconsOK = {
  Biowaste: biowasteOK,
  Cardboard: cardboardOK,
  Metal: metalOK,
  General: generalOK,
  Glass: glassOK,
  Plastic: plasticOK,
}

const iconsFull = {
  Biowaste: biowasteFull,
  Cardboard: cardboardFull,
  Metal: metalFull,
  General: generalFull,
  Glass: glassFull,
  Plastic: plasticFull,
}

const InfoBoxItem = ({ type, fillStatus, overflowStatus }) => (
    <div className="infoboxitem">
        {fillStatus === 100 ? (
            <img src={ iconsFull[ type ] } className="infobox-item" alt="test" />
        ) : (
            <img src={ iconsOK[ type ] } className="infobox-item" alt="test" />
        )}
        {overflowStatus ? (
            <img src={ alert } className="alerticon" alt="alert" />
        ) : (
          null
        )}
    </div>
)
export default InfoBoxItem;
