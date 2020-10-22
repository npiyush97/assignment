import React from 'react';
import _ from 'lodash';
import { Tab, Tabs,Carousel } from 'react-bootstrap';

function AvgTemHourly(props) {
    const avgtemp = _.map(_.map(_.groupBy(_.map(props.data, p => { return { device_name: p.device_display_name, temp_reading: p.reading, timeinhrs: (new Date(p.time)).getHours() } }), 'timeinhrs'), v => _.groupBy(v, 'device_name')), b => _.map(b, a => { return { device_name: a[0].device_name, mean_reading: _.meanBy(a, p => p.temp_reading), timeinhrs: a[0].timeinhrs } }))

    return (
        <div className="card shadow mb-5 rounded text-white bg-primary">
            <div className="card-header text-center">
                <h6>Average Hourly Temperature</h6>
            </div>
            <div className="card-body bg-dark">
                <Tabs className="nav-pills nav-fill">
                    {
                        avgtemp.map((val) =>
                            <Tab key={val[0].timeinhrs} eventKey={val[0].timeinhrs} title={val[0].timeinhrs + '-' + (val[0].timeinhrs + 1)}>
                                <Carousel>
                                    {val.map((avg) =>
                                        <Carousel.Item key={avg.device_name}>
                                            <Carousel.Caption className="text-white">
                                                <h6>{avg.device_name}</h6>
                                                <p>{avg.mean_reading}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </Tab>
                        )
                    }
                </Tabs>
            </div>
        </div>
    )
}

export default AvgTemHourly;
