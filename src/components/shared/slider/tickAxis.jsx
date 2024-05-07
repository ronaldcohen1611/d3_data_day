import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TickAxis = ({ width = 1500 }) => {
  const svgRef = useRef(null);
  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current).attr('height', '1600');
    const margin = { top: 20, right: 20, bottom: 80, left: 20 };

    const x = d3
      .scaleLinear()
      .range([0, width - margin.left - margin.right])
      .domain([0, 100]);

    // Calculate tick values
    const tickValues = d3.range(0, 101, 5); // Adjust the step as needed

    const x_axis = d3
      .axisBottom(x)
      .tickSize(6) // Adjust the tick size
      .tickPadding(8) // Adjust the tick padding
      .tickValues(tickValues) // Specify the tick values
      .tickFormat((d) => d); // Display the tick values

    svg
      .append('g')
      .attr('class', 'x axis')
      .call(x_axis)
      .style('font-size', '12px')
      .attr('transform', 'translate(10,10)');

    // Append tick labels
    svg
      .selectAll('.tick text')
      .style('text-anchor', 'middle') // Center the text
      .attr('dy', '.71em') // the vertical position of the text
      .attr('y', '5'); // the distance of the labels from the axis
  }, [width]);

  return <svg ref={svgRef} className="w-full h-8"></svg>;
};

export { TickAxis };
