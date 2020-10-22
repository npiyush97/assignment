import React, { useState } from 'react';
import _ from 'lodash';
import AvgTemp from './AvgTemp';

function CurrentTemprature(props) {
    const [currentAvg, setCurrentAvg] = useState([]);
    const [counter, setCounter] = useState(0);

    const avg = () => {
        setCounter(counter + 100);
        if (counter < props.data.length)
            setCurrentAvg(_.map(_.groupBy(props.data.slice(0, counter), 'device_display_name'), v => { return { device_name: v[0].device_display_name, mean_reading: _.meanBy(v, p => p.reading) } }))
    };
    setTimeout(() => { avg() }, 10000);

    return (
        <AvgTemp avgtemp={currentAvg} heading='Live Temperature' />
    )
}

export default CurrentTemprature;
