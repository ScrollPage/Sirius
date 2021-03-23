import { ISequence } from "@/types/sequence";
import React from "react";
import Chartt from "react-apexcharts";

const FREQUENCY = 2048;

interface Props {
  sequences: ISequence[];
}

const Chart: React.FC<Props> = ({ sequences }) => {
  const categories = [...Array(sequences[0].length).keys()].map(
    (key) => (++key / FREQUENCY) * 1000
  );

  const formatTime = (value: string) => {
    return (Number(value) * 10 ** 6).toFixed(0);
  };

  const options = {
    chart: {
      type: "line",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    yaxis: {
      title: {
        text: "Милливольты",
      },
    },
    xaxis: {
      title: {
        text: "Миллисекунды",
        align: "right",
      },
      categories,
      type: "numeric",
    },
    tooltip: {
      shared: false,
    },
    stroke: {
      width: 2,
    },
    // annotations: {
    //   points: [
    //     {
    //       x: 43,
    //       y: 3,
    //       marker: {
    //         size: 3,
    //         fillColor: "#fff",
    //         strokeColor: "#FF4560",
    //         strokeWidth: 3,
    //         shape: "circle",
    //         radius: 2,
    //         OffsetX: 0,
    //         OffsetY: 0,
    //         cssClass: "",
    //       },
    //       label: {
    //         borderColor: "#FF4560",
    //         text: "Выбранное значение",
    //       },
    //     },
    //   ],
    // },
  };

  const series = sequences.map((sequence) => ({
    name: sequence.id,
    data: sequence.values.map((value) => formatTime(value)),
  }));

  return <Chartt options={options} series={series} type="line" width="100%" />;
};

export default Chart;
