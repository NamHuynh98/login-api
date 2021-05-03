import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import "./styles.css"

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const chartConfig = {
  type: "radar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange ", "ádas", "qưeqw"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3, 3, 4],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }
    ]
  },
  options: {
    legend: {
      display: false
    }
  }
};

const Chart = () => {
  const chartContainer = useRef(null);
  const tooltip = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [width, setWidth] = useState(0)
  const [textTooltip, setTextTooltip] = useState("")
  // const b = useRef(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      console.log("newChartInstance", newChartInstance)
      console.log("chartContainer.current", chartContainer.current)
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt()
    ];
    updateDataset(0, data);


  };

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
  });

  useEffect(() => {
    if (chartInstance) {

      // var pointLabelPosition = this.scale.getPointPosition(i, 
      //   this.scale.calculateCenterOffset(this.scale.max) + 5);
      let b = document.getElementById("abc")
      // console.log(b)
      removeAllChildNodes(b)
      for (let i = 0; i < chartInstance.data.labels.length; i++) {
        const pointLabelPosition = chartInstance.scale.getPointPosition(i, Math.ceil(chartInstance.scale.yCenter - 10));
        // const pointLabelPosition = chartInstance.scale.getPointPosition(i, (chartInstance.height + 12 * 2) / 2);
        let a = document.createElement('div')
        a.innerHTML = `<div style="position:absolute;
                                  top:${Math.ceil(pointLabelPosition.y + 20)}px;
                                  left:${Math.ceil(pointLabelPosition.x)}px;
                                  width:10px;
                                  height: 10px;
                                  background-color: red;">
                      </div>`
        a.addEventListener("mouseover", (e) => {
          tooltip.current.hidden = false;
          // console.log("top", pointLabelPosition.y + 25 - tooltip.current.offsetHeight - 10)
          // console.log("left", pointLabelPosition.x - tooltip.current.offsetWidth / 2 + 5)
          console.log(tooltip.current.offsetWidth)

          tooltip.current.style.top = Math.ceil(pointLabelPosition.y + 25 - tooltip.current.offsetHeight - 10) + "px"
          tooltip.current.style.left = Math.ceil(pointLabelPosition.x - tooltip.current.offsetWidth / 2 + 5) + "px"
          setTextTooltip(chartInstance.data.labels[i])
        })
        a.addEventListener("mouseout", (e) => {
          tooltip.current.hidden = true;
        })
        b.appendChild(a);
      }

      // let c = document.createElement("div");
      // b.appendChild(c.innerHTML = `<div style="position:absolute;
      //                                         top:${Math.ceil(chartInstance.scale.yCenter)}px;
      //                                         left:${Math.ceil(chartInstance.scale.xCenter)}px;
      //                                         width:10px;
      //                                         height: 10px;
      //                                         background-color: red;">
      //                             </div>`
      // )
    }
  }, [chartInstance, width]);



  return (
    <div>
      <button onClick={onButtonClick}>Randomize!</button>
      <canvas ref={chartContainer} />
      <div id="abc"></div>

      <div className="tooltip" ref={tooltip} hidden="true">{textTooltip}</div>
    </div>
  );
};

export default Chart;
