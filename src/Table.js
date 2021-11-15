import React from 'react';
import './Table.css';
import numeral from 'numeral';
import { v1 as uuid } from 'uuid';

function Table({ countries }) {
    return<div className="table">
            {countries.map(({country , cases }) => (
                <tr>
                    <td key={uuid() }><strong>{country}</strong></td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
}

export default Table
