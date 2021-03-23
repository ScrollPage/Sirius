import { ISequence } from "@/types/sequence";
import { useColorMode } from "@chakra-ui/color-mode";
import React from "react";
import Chartt from "react-apexcharts";

const FREQUENCY = 2048;

interface Props {
  sequences: ISequence[];
}

const Chart: React.FC<Props> = ({ sequences }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const color = isDark ? "#fff" : "#000";
  const categories = [...Array(sequences[0].length).keys()].map(
    (key) => (++key / FREQUENCY) * 1000
  );

  const formatTime = (value: string) => {
    return (Number(value) * 10 ** 6).toFixed(0);
  };

  const options = {
    theme: {
      mode: colorMode,
    },
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
        style: {
          color,
        },
      },
    },
    xaxis: {
      title: {
        text: "Миллисекунды",
        align: "right",
        style: {
          color,
        },
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
  };

  const series = sequences.map((sequence) => ({
    name: sequence.id,
    data: sequence.values.map((value) => formatTime(value)),
  }));

  return <Chartt options={options} series={series} type="line" width="100%" />;
};

export default Chart;
