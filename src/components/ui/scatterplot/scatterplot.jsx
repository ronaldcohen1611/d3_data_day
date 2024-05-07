import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({
  data,
  x_col,
  y_col,
  withAxis = true,
  xTickMin = 0,
  xTickCountIdx = 5,
  xTickSize = 0,
  yTickMin = 0,
  yTickCountIdx = 2,
  yTickSize = 10,
  width = 600,
  height = 250,
}) => {
  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  const scatterRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const xData = data.map((item) => item[x_col]);
    const yData = data.map((item) => item[y_col]);

    d3.select(scatterRef.current).selectAll('*').remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(xData)])
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yData)]) // Corrected domain calculation
      .range([h, 0]);

    const container = d3.select(scatterRef.current);

    if (withAxis === true) {
      // set axis with ticks
      container
        .selectAll('.x_axis_g')
        .data([null])
        .join('g')
        .attr('class', 'x_axis_g')
        .call(
          d3
            .axisBottom(xScale)
            .tickSize(xTickSize)
            .tickPadding(3)
            .ticks(10)
            .tickValues(d3.range(xTickMin, d3.max(xData) + 1, xTickCountIdx))
            .tickFormat((d) => Math.round(d))
        )
        .style('font-size', '12px')
        .attr('transform', `translate(0, ${h})`)
        .selectAll('.domain')
        .attr('stroke', '#7e24b3');

      container
        .selectAll('.y_axis_g')
        .data([null])
        .join('g')
        .attr('class', 'y_axis_g')
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(yTickSize)
            .tickPadding(5)
            .tickValues(d3.range(yTickMin, d3.max(yData) + 1, yTickCountIdx))
        )
        .style('font-size', '12px')
        .selectAll('.domain')
        .attr('stroke', '#7e24b3');
    } else {
      container
        .selectAll('.x_axis_g')
        .selectAll('.tick line')
        .attr('display', 'none');
    }

    // axis labels
    container
      .selectAll('.x_label')
      .data([null])
      .join('text')
      .attr('class', 'x_label')
      .attr('text-anchor', 'middle')
      .attr('x', w / 2)
      .attr('y', h + margin.bottom)
      .text(x_col)
      .style('padding', '10px');

    container
      .selectAll('.y_label_g')
      .data([y_col])
      .join('text')
      .attr('class', 'y_label')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 1)
      .attr('x', -h / 2)
      .text(function (d) {
        return d;
      });

    container
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d[x_col]))
      .attr('cy', (d) => yScale(d[y_col]))
      .attr('r', 3)
      .style('fill', '#7e24b3')
      .style('opacity', '0.8')
      .on('mouseover', (event, d) => {
        tooltip.html(`${x_col}:${d[x_col]}<br>${y_col}: ${d[y_col]}`); // sets the tooltip text to the node's size property
        tooltip.style('visibility', 'visible'); // makes the tooltip visible
      })
      .on('mousemove', (event) => {
        return tooltip
          .style('top', event.pageY - 10 + 'px') // positions the tooltip slightly above the cursor
          .style('left', event.pageX + 10 + 'px'); // positions the tooltip to the right of the cursor
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden')); // hides the tooltip on mouseout;

    var tooltip = d3
      .select('body')
      .selectAll('.tooltip_div')
      .data([0]) // binds a single element to the tooltip
      .join('div') // joins the data to a div element
      .attr('class', 'tooltip_div') // adds a CSS class for styling
      .style('position', 'absolute') // uses absolute positioning
      .style('visibility', 'hidden');
  }, [
    data,
    h,
    margin.bottom,
    margin.left,
    w,
    withAxis,
    xTickCountIdx,
    xTickMin,
    xTickSize,
    x_col,
    yTickCountIdx,
    yTickMin,
    yTickSize,
    y_col,
  ]);

  return (
    <svg
      className="child1_svg"
      width={w + margin.left + margin.right}
      height={h + margin.top + margin.bottom}
    >
      <g
        ref={scatterRef}
        className="g_1"
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    </svg>
  );
};

export { ScatterPlot };
