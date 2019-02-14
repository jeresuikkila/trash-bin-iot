import React from 'react';

const Checkbox = ({
  type = 'checkbox', name, checked = false, onChange, id,
}) => (
    <input id={ id } type={ type } name={ name } checked={ checked } onChange={ onChange } />
);

export default Checkbox;
