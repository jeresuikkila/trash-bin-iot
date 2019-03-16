import React from 'react';
import AccordionBin from '../AccordionBin';
import './styles.css'
import biowaste from '../../static/biowaste.png';
import cardboard from '../../static/carton.png';
import metal from '../../static/metal.png';
import general from '../../static/general.png';
import glass from '../../static/glass.png';
import plastic from '../../static/plastic.png';
import accordionArrow from '../../static/accordion-arrow.png'
//import trashbinOk from '../../static/trashbin-white.png';
//import trashbinFull from '../../static/trashbin-orange.png';
import alert from '../../static/alert.png';

const icons = {
  Biowaste: biowaste,
  Cardboard: cardboard,
  Metal: metal,
  General: general,
  Glass: glass,
  Plastic: plastic,
}

const AccordionItem = ({ trashbins, type, locationId, overflowTypes }) => (
    <div className="card">
        <div className={ `card-header-${ type.toLowerCase() }` } id={ `${ type + locationId }-heading` } data-toggle="collapse" data-target={ `#${ type }${ locationId }` } aria-expanded="false" aria-controls={ type + locationId }>
            <img src={ icons[ type ] } className="type-icon" alt="type" />
            <p className="header-title">
                {type.toUpperCase()}
                <img src={ accordionArrow } className="arrow" alt="arrow" />
            </p>
            {overflowTypes.includes(type) && <img src={ alert } className="alert" alt="alert" />}
        </div>
        <div id={ type + locationId } className="collapse" aria-labelledby={ `${ type + locationId }-heading` } data-parent={ `#accordion${ locationId }` }>
            <div className="card-body">
                {
                        trashbins.map( (bin, i) => (
                            <AccordionBin
                              trashbin={ bin }
                              idx={ i + 1 }
                              overflowTypes={overflowTypes}
                              type={type}
                              key={ bin.id }
                            />
                        ))
                    }
            </div>
        </div>
    </div>
)

export default AccordionItem;
