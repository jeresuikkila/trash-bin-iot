import React from 'react';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import './CSS/EventMenu.css'

const menuItemWords = ['All', 'Opened', 'Emptied'];

class EventMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {selected: ''};
    }

    handleSelection(value) {
        this.setState({selected: value});
    }

    render() {
        const {selected} = this.state;
        const menuItems = menuItemWords.map((word, i) => {
        let itemClass = 'AriaMenuButton-menuItem';
        if (selected === word) {
            itemClass += 'is-selected'
        }
        return (
            <li className="AriaMenuButton-menuItemWrapper" key={i}>
            <MenuItem className={itemClass} value={word} text={word}>
                {word}
            </MenuItem>
            </li>
        );
        });

        return (
        <div>
            <Wrapper
                className='AriaMenuButton'
                onSelection={this.handleSelection.bind(this)}
            >
                <Button tag="button" className='AriaMenuButton-trigger'>
                Select event type
                </Button>
                <Menu>
                <ul className="AriaMenuButton-menu"> {menuItems}</ul>
                </Menu>
            </Wrapper>
                <span style={{ marginLeft: '1em' }}>
                    Your last selection was: <strong>{selected}</strong>
                </span>
            
        </div>
        );   
    }
}

export default EventMenu;
