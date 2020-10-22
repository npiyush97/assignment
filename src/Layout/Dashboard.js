import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import SelectOptions from '../Components/SelectOptions';
import EchartsPlot from '../Components/echartsPlot';
import CurrentTemprature from '../Components/CurrentTemprature';
import AvgTemp from '../Components/AvgTemp';
import DeviceTable from '../Components/DeviceTable';
import AvgTemHourly from '../Components/AvgTempByHour';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
    const [data, setData] = useState([]);
    const [type, setType] = useState('');
    const [device, setDevice] = useState('');
    const [newdata, setNewdata] = useState([]);

    function onTypeChange(event) {
        setType(event.target.value)
        setDevice('')
        if (event.target.value !== '')
            setNewdata(_.filter(data, ['device_type', event.target.value]))
        else
            setNewdata(data)
    }

    function onDeviceChange(event) {
        setDevice(event.target.value);
        if (type !== '' && event.target.value !== '')
            setNewdata(_.filter(data, { 'device_type': type, 'device_display_name': event.target.value }))
        else if (event.target.value !== '') {
            setNewdata(_.filter(data, ['device_display_name', event.target.value]))
            setType('')
        }
        else if (type !== '')
            setNewdata(_.filter(data, ['device_type', type]))
        else {
            setNewdata(data)
            setType('')
        }
    }

    const setJson = () => {
        axios.get('/data.json')
            .then(res => {
                const data = res.data;
                setData(data.data);
                setNewdata(data.data);
            })
    }

    useEffect(() => {
        setJson();
    }, []);


    return (
        <div className="content">
            <Container>
                <Row>
                    <Col>
                        <div className="card shadow mb-5 rounded text-white text-center bg-primary border-primary">
                            <div className="card-header ">
                                <h6>Devices Dashboard</h6>
                            </div>
                            <div className="card-body bg-white">
                                <Row>
                                    <Col md={3}></Col>
                                    <Col md={3}>
                                        <SelectOptions onselectChange={onTypeChange} value={type} select='Type' options={_.uniq(_.map(data, 'device_type'))} />
                                    </Col>
                                    <Col md={3}>
                                        <SelectOptions onselectChange={onDeviceChange} value={device} select='Device' options={_.uniq(_.map(newdata, 'device_display_name'))} />
                                    </Col>
                                </Row>
                                <br />
                                <EchartsPlot data={_.sortBy(newdata, dtime => { return new Date(dtime.time) })} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} sm={3}>
                        <AvgTemp heading='Average Temperature' avgtemp={_.map(_.groupBy(data, 'device_display_name'), v => { return { device_name: v[0].device_display_name, mean_reading: _.meanBy(v, p => p.reading) } })} />
                    </Col>
                    <Col lg={6} sm={3}>
                        <CurrentTemprature data={data} />
                    </Col>
                    <Col lg={12} sm={9}>
                        <AvgTemHourly data={data} />
                    </Col>
                    <Col lg={12} sm={9}>
                        <DeviceTable devices={_.uniqBy(data, v => [v.device_display_name, v.device_type].join())} />
                    </Col>
                </Row>


            </Container>
        </div>
    );
}

export default Dashboard;
