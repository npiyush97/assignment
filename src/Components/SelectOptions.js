import React from 'react';
import { Form } from 'react-bootstrap';

function SelectOptions(props) {
    return (
        <Form.Control as="select" onChange={props.onselectChange} value={props.value}>
            <option value=''>Select {props.select}</option>
            {props.options.map(value => <option key={value} value={value}>{value}</option>)}
        </Form.Control>
    );
}

export default SelectOptions;
