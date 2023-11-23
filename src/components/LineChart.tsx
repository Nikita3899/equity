import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer';

const LineChart = () => {
  const [data] = useState([1, 120, 63, 4, 5]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimensions(containerRef);

  useEffect(() => {
    const svg = d3.select(svgRef.current).style('overflow', 'visible');

    // Clear previous content
    svg.selectAll('*').remove();

    // Set up the chart dimensions
    const chartWidth = width;
    const chartHeight = 180;

    // Set up the SVG
    svg.attr('width', width+20).attr('height', chartHeight + 50);

    // Create a scale for the x-axis
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, chartWidth]);

    // Create a scale for the y-axis
    const yScale = d3.scaleLinear().domain([0, d3.max(data) || 1]).range([chartHeight, 0]);

    // Define the line function
    const line = d3
      .line<number>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal);

    // setting up the axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSizeInner(0).tickFormat(((d, i) => (i + 1).toString()) as (d: d3.NumberValue, i: number) => string);

    // Create a container group for the chart
    const chart = svg.append('g');

    // Create clipping path
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'chart-clip-path')
      .append('rect')
      .attr('width', chartWidth + 6)
      .attr('height', chartHeight + 60); 

    // Apply clipping path to the chart
    chart.attr('clip-path', 'url(#chart-clip-path)');

    // Draw the x-axis
    chart
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${chartHeight + 15})`)
      .selectAll('path')
      .style('display', 'none') 

    // Draw the line chart
    chart
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 3);
  }, [data, width]);

  return (
    <div ref={containerRef} style={{ width: '90%' }}>
      <svg ref={svgRef} width={`${width}`} height="100%"></svg>
    </div>
  );
};

export default LineChart;
