import React from 'react';
import { Table } from 'react-bootstrap';

function DeviceTable(props) {
    return (
        <div className="card shadow mb-5 rounded text-white  bg-primary">
            <div className="card-header text-center">
                <h6>Device Types</h6>
            </div>
            <div className="card-body table-wrapper-scroll-y my-custom-scrollbar bg-white">
                <Table striped bordered hover>
                    <tbody>
                        {props.devices.map((val, i) =>
                            <tr key={i}>
                                <td>{val.device_display_name}</td>
                                <td>{val.device_type}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default DeviceTable;
