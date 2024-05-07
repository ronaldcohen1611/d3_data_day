import * as d3 from 'd3';
import { cn } from '../../../lib/utils';
import { useEffect, useRef, useCallback } from 'react';

const BarChart = ({
  numerical_data,
  categorical_data,
  catSelectedValue,
  withAxis = false,
  innerBarPad = 0.05,
  outterBarPad = 0.1,
  yTickMin = 0,
  width = 600,
  height = 250,
  className = '',
}) => {
  const svgRef = useRef();;

  const genChart = useCallback(() => {
    // Combine numerical and categorical data into an array of objects
      const combinedData =
        numerical_data &&
        numerical_data.map((numData, index) => {
          const categoryValue =
            categorical_data && categorical_data[index][catSelectedValue];
          return {
            ...numData,
            [catSelectedValue]: categoryValue,
          };
        });
      if (!combinedData) return;

    let countObj = {}

    combinedData.forEach((datapoint) => { 
      if (!countObj[datapoint.category]) {
        countObj[datapoint.category] = 1
      } else {
        countObj[datapoint.category]++;
      }
    })

    const tempData = Object.keys(countObj).map((key) => {
      return [key, countObj[key]];
    })


    // Clear previous chart *** THIS IS KEYYY ***
    d3.select(svgRef.current).selectAll('*').remove();

    const w = width;
    const h = height;

    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top', '20px');

    const xScale = d3
      .scaleBand()
      .domain(tempData.map((data) => data[0]))
      .range([0, w])
      .padding(outterBarPad)
      .paddingInner(innerBarPad);

    const yScale = d3
      .scaleLinear()
      .domain([yTickMin, d3.max(tempData, (data) => data[1])])
      .range([h, 0]);

    if (withAxis === true) {
      svg
        .selectAll('.x_axis_g')
        .data([0])
        .join('g')
        .attr('class', 'x_axis_g')
        .attr('transform', `translate(0, ${h})`)
        .call((g) =>
          g
            .call(d3.axisBottom(xScale).tickSize(5).tickPadding(5))
            .select('.domain')
            .attr('stroke', 'black')
        )
        .style('font-size', '14px');
    } else {
      svg
        .selectAll('.x_axis_g')
        .selectAll('.tick line')
        .attr('display', 'none');
    }

    svg
      .selectAll('.bar')
      .data(tempData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (data) => xScale(data[0]))
      .attr('y', (data) => yScale(data[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', (data) => h - yScale(data[1]))
      .style('fill', '#69B3A2'); 

    // Labels
    svg
      .selectAll('.bar-label')
      .data(tempData)
      .join('text')
      .attr('class', 'bar-label')
      .attr('x', function (d) {
        return xScale(d[0]) + xScale.bandwidth() / 2;
      })
      .attr('y', function (d) {
        return yScale(d[1]) + 15;
      })
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(function (d) {
        return d[1];
      })
      .style('fill', 'black');

    svg
      .selectAll('.x_label')
      .data([0])
      .join('text')
      .attr('class', 'x_label')
      .attr('text-anchor', 'middle')
      .attr('x', w / 2)
      .attr('y', h + 50)
      .text('categories')
      .style('font-size', '14px');
  }, [numerical_data, catSelectedValue, width, height, outterBarPad, innerBarPad, yTickMin, withAxis, categorical_data]);

  useEffect(() => {
    if (!numerical_data || !categorical_data) return null;
    genChart();
  }, [categorical_data, genChart, numerical_data]);

  return (
    <div className={cn(className, '')}>
      <svg className="svg" ref={svgRef}></svg>
    </div>
  );
};

export { BarChart };
