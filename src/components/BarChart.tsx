import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer'; // Replace with the correct path

const BarChart = () => {
  const [data] = useState([56, 88, 90, 67, 23]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimensions(containerRef);

  useEffect(() => {
    const drawChart = () => {
      const w = width;
      const h = 160;

      d3.select(svgRef.current).selectAll('*').remove();

      // setting the svg
      const svg = d3
        .select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('margin-top', 20)
        .style('overflow', 'visible'); // boundaries

      // setting the scales
      const xScale = d3
        .scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, w])
        .padding(0.8);

      const yScale = d3.scaleLinear().domain([0, d3.max(data) || 0]).range([h, 0]);

      // setting the axes
      const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSizeInner(0);

      const xAxisGroup = svg
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0,${h + 30})`)
        .selectAll('path')
        .style('display', 'none');

      xAxisGroup.selectAll('.tick text').classed('axis-x', true);

      // setting data in svg
      const bars = svg.selectAll('.bar').data(data);

      bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (_, i) => xScale(String(i)) || 0)
        .attr('y', (val) => yScale(val))
        .attr('width', xScale.bandwidth())
        .attr('height', (val) => h - yScale(val))
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('fill', 'blue');
    };

    drawChart(); // Initial draw

    // Redraw on window resize
    window.addEventListener('resize', drawChart);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [data, width]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display:'flex', alignItems:'center',justifyContent:'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
