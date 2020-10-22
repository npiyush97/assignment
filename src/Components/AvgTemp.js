import React from 'react';
import { Carousel } from 'react-bootstrap';

function AvgTemp(props) {
    return (
        <div className="card shadow mb-5 rounded text-white text-center bg-primary">
            <div className="card-header">
                <h6>{props.heading}</h6>
            </div>
            <div className="card-body bg-dark">
                <Carousel>
                    {props.avgtemp.map((val) =>
                        <Carousel.Item key={val.device_name}>
                            <Carousel.Caption className="text-white">
                                <h6>{val.device_name}</h6>
                                <p>{val.mean_reading}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        </div>
    )
}

export default AvgTemp;
