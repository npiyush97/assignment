import React from 'react';
import ReactEcharts from "echarts-for-react";
import _ from 'lodash';

function EchartsPlot(props) {
    const jsonData = _.map(_.groupBy(props.data, 'device_display_name'),v => { return { device_name: v[0].device_display_name, temp_readings: _.map(v, p => p.reading), time_readings: _.map(v, p => (new Date(p.time)).toLocaleTimeString()) } });
    const userDevices=_.uniq(_.map(props.data, 'device_display_name'));
    const userReadings= _.sortBy(_.uniq(_.map(props.data, 'reading')));
    const userTimes=_.uniq(_.map(props.data, v=>{return (new Date(v.time)).toLocaleTimeString()}));
    // type of chart used here is line
    const merged = _.map(jsonData,v=>{return {name:v.device_name,data:out(v),type: 'line'}});
    function out(v){let a=[]; _.forEach(v.temp_readings,(t,i)=>{a.push([v.time_readings[i],t]) }); return a};

    return (
        <div>
            <ReactEcharts notMerge={true}
                option={{
                    title: {
                        text: ''
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data: userDevices
                    },
                    calculable : true,
                    xAxis: {
                        type: 'category',
                        boundaryGap:false,
                        data: userTimes
                    },
                    yAxis: {
                        type: 'value',
                        data: userReadings,
                        min:20,
                        max:28
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            smooth:true,
                            borderColor:'green',
                            start: 0,
                            end: 5,
                            handleSize: 5
                        },
                        {
                            type: 'inside',
                            start: 97,
                            end: 100
                        },
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 12,
                            height: '75%',
                            handleSize: 8,
                            showDataShadow: false,
                            left: '93%'
                        }
                    ],
                    series: merged
                }}
            />
        </div>
    )
}

export default EchartsPlot;
