"use client";

import React from "react";

interface DataPoint {
  x: number;
  y: number;
  z: number;
  group: string;
  text: string;
}

interface Scatter3DProps {
  data: DataPoint[];
}

declare global {
  interface Window {
    Plotly: any;
  }
}

function Scatter3DTranscript({ data }: Scatter3DProps) {
  const plotlyPromiseRef = React.useRef<Promise<any> | null>(null);

  React.useEffect(() => {
    // Plotly 로드 함수
    const loadPlotly = async () => {
      if (!plotlyPromiseRef.current) {
        plotlyPromiseRef.current = new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdn.plot.ly/plotly-2.27.0.min.js";
          script.async = true;
          script.onload = () => resolve(window.Plotly);
          document.head.appendChild(script);
        });
      }
      return plotlyPromiseRef.current;
    };

    // 플롯 초기화 함수
    const initPlot = async () => {
      const Plotly = await loadPlotly();

      // 그룹별로 데이터 분리
      const groupedData = data.reduce((acc, curr) => {
        if (!acc[curr.group]) {
          acc[curr.group] = [];
        }
        acc[curr.group].push(curr);
        return acc;
      }, {} as Record<string, DataPoint[]>);

      // 각 그룹별 색상 정의
      const colorMap = new Map([
        ["group1", "#FF6384"],
        ["group2", "#36A2EB"],
        ["group3", "#4BC0C0"],
        ["group4", "#FF9F40"],
        ["group5", "#9966FF"],
      ]);

      // 각 그룹별로 trace 생성
      const traces = Object.entries(groupedData).map(([group, points]) => {
        const color = colorMap.get(group) || "#FFFFFF";

        return {
          type: "scatter3d",
          mode: "markers",
          name: group,
          x: points.map((p) => p.x),
          y: points.map((p) => p.y),
          z: points.map((p) => p.z),
          text: points.map((p) => p.text),
          hoverinfo: "text",
          hovertext: points.map(
            (p) =>
              `Transcript: ${p.text}<br>X: ${p.x}<br>Y: ${p.y}<br>Z: ${p.z}`
          ),
          marker: {
            symbol: "circle",
            size: 6,
            color: color,
            opacity: 0.8,
            line: {
              color: color,
              width: 1,
            },
          },
        };
      });

      const layout = {
        width: 800,
        height: 600,
        paper_bgcolor: "#000000",
        plot_bgcolor: "#000000",
        scene: {
          bgcolor: "#000000",
          xaxis: {
            title: {
              text: "X",
              font: {
                family: "Arial",
                size: 12,
                color: "#FFFFFF",
              },
            },
            showgrid: true,
            gridcolor: "#FFFFFF",
            gridwidth: 1,
            zerolinecolor: "#FFFFFF",
            zerolinewidth: 1,
            showline: true,
            linecolor: "#FFFFFF",
            linewidth: 1,
            showbackground: true,
            backgroundcolor: "#000000",
          },
          yaxis: {
            title: {
              text: "Y",
              font: {
                family: "Arial",
                size: 12,
                color: "#FFFFFF",
              },
            },
            showgrid: true,
            gridcolor: "#FFFFFF",
            gridwidth: 1,
            zerolinecolor: "#FFFFFF",
            zerolinewidth: 1,
            showline: true,
            linecolor: "#FFFFFF",
            linewidth: 1,
            showbackground: true,
            backgroundcolor: "#000000",
          },
          zaxis: {
            title: {
              text: "Z",
              font: {
                family: "Arial",
                size: 12,
                color: "#FFFFFF",
              },
            },
            showgrid: true,
            gridcolor: "#FFFFFF",
            gridwidth: 1,
            zerolinecolor: "#FFFFFF",
            zerolinewidth: 1,
            showline: true,
            linecolor: "#FFFFFF",
            linewidth: 1,
            showbackground: true,
            backgroundcolor: "#000000",
          },
          camera: {
            up: { x: 0, y: 0, z: 1 },
            center: { x: 0, y: 0, z: 0 },
            eye: { x: 1.5, y: 1.5, z: 1.5 },
          },
        },
        showlegend: true,
        legend: {
          x: 1,
          xanchor: "right",
          y: 1,
          font: {
            family: "Arial",
            size: 12,
            color: "#FFFFFF",
          },
          bgcolor: "#000000",
          bordercolor: "#FFFFFF",
          borderwidth: 1,
        },
        margin: {
          l: 0,
          r: 0,
          t: 0,
          b: 0,
          pad: 0,
        },
        hoverlabel: {
          bgcolor: "#000000",
          bordercolor: "#FFFFFF",
          font: {
            family: "Arial",
            size: 12,
            color: "#FFFFFF",
          },
        },
        autosize: true,
      };

      const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["lasso2d", "select2d"],
      };

      const plotElement = document.getElementById("plot");
      if (plotElement) {
        await Plotly.newPlot("plot", traces, layout, config);

        // 반응형 처리
        const handleResize = () => {
          Plotly.Plots.resize("plot");
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    };

    // 플롯 초기화 실행
    const cleanup = initPlot();

    // Cleanup 함수
    return () => {
      cleanup
        .then(() => {
          const plotElement = document.getElementById("plot");
          if (plotElement && window.Plotly) {
            window.Plotly.purge(plotElement);
          }
        })
        .catch(console.error);
    };
  }, [data]);

  return (
    <div className="w-full h-96 bg-black">
      <div id="plot" className="w-full h-full" />
    </div>
  );
}

export { Scatter3DTranscript };
