import '../css/table.css';
import React from 'react';

const Table = (props) => (
  <div id="div_table">
    <img id="img_table" alt="table" src="static/icons/restaurant-table.png" />
    <p id="p_table">{props.number}</p>
  </div>
);

export default Table;
