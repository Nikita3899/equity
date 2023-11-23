import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer'

 // Assuming you have a useDimensions hook

const LineChart = () => {
  const [data] = useState([67, 98, 78, 10, 89]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(containerRef);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
                    .style('overflow', 'visible');

    // Clear previous content
    svg.selectAll('*').remove();

    // Set up the chart dimensions
    const margin = { top: 40, right: 10, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    console.log(width,'width');

    // Set up the SVG
    svg.attr('width', width).attr('height', height);

    // Create a scale for the x-axis
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, chartWidth]);

    // Create a scale for the y-axis
    const yScale = d3.scaleLinear().domain([0, d3.max(data) || 0]).range([chartHeight, 0]);

    // Define the line function
    const line = d3
      .line<number>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal);

    // setting up the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickSizeInner(0)
      .tickFormat(((d, i) => (i + 1).toString()) as (d: d3.NumberValue, i: number) => string);

    // const yAxis = d3.axisLeft(yScale);

    // Create a container group for the chart
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw the x-axis
    chart
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${140})`)
      .selectAll('path')
      .style('display', 'none')
      .selectAll('text')
      .style('fill', '#dedede');

    // Draw the y-axis
    // chart.append('g').call(yAxis);

    // Draw the line chart
    chart
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);
  }, [data, width, height]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    </div>
  );
};

export default LineChart;

