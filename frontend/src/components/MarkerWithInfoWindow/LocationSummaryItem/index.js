import React from 'react';
import './styles.css'
import BioWasteIcon from '../../../static/biowaste.png';
import CardBoardIcon from '../../../static/carton.png';
import PaperIcon from '../../../static/paper.png';
import GeneralIcon from '../../../static/general.png';
import GlassIcon from '../../../static/glass.png';
import PlasticIcon from '../../../static/general.png';

const imageMap = {
    'Biowaste': BioWasteIcon,
    'Cardboard': CardBoardIcon,
    'Paper': PaperIcon,
    'General': GeneralIcon,
    'Glass': GlassIcon,
    'Plastic': PlasticIcon
  }

const LocationSummaryItem = (props) => (
    <div>
        <img src={ imageMap[ props.type ] } className="type-icon" alt="test"/>
    </div>
)
export default LocationSummaryItem;