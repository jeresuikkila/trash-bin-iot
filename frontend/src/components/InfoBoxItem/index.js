import React from 'react';
import './styles.css'
import BioWasteIcon from '../../static/biowaste.png';
import CardBoardIcon from '../../static/carton.png';
import PaperIcon from '../../static/paper.png';
import GeneralIcon from '../../static/general.png';
import GlassIcon from '../../static/glass.png';

const imageMap = {
  Biowaste: BioWasteIcon,
  Cardboard: CardBoardIcon,
  Paper: PaperIcon,
  General: GeneralIcon,
  Glass: GlassIcon,
  Plastic: GeneralIcon,
}

const InfoBoxItem = ({ type /* fillStatus */ }) => (
    <div>
        <img src={ imageMap[ type ] } className="type-icon" alt="test" />
    </div>
)
export default InfoBoxItem;
