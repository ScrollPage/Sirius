import { ISequence } from "@/types/sequence";
import React from "react";
import Chartt from "react-apexcharts";

interface Props {
  sequences: ISequence[];
}

const Chart: React.FC<Props> = ({ sequences }) => {
  var options = {
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
    title: {
      text: "Значения",
      align: "left",
    },
    yaxis: {
      title: {
        text: "Милливольты",
      },
    },
    xaxis: {
      categories: [...Array(sequences[0].length).keys()].map((key) => ++key),
      labels: {
        // rotate: 0,
        hideOverlappingLabels: true,
      },
      type: "numeric",
    },
    tooltip: {
      shared: false,
    },
  };

  const series = sequences.map((sequence) => ({
    name: sequence.id,
    data: sequence.values.map((value) => (Number(value) * 10 ** 6).toFixed(0)),
  }));

  return <Chartt options={options} series={series} type="line" width="100%" />;
};

export default Chart;
