import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer';

interface LineChartProps {
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<number | null>(null);
  const { width } = useDimensions(containerRef);

  useEffect(() => {
    const svg = d3.select(svgRef.current).style('overflow', 'visible');

    // Clear previous content
    svg.selectAll('*').remove();

    // Setting up the chart dimensions
    const chartWidth = width;
    const chartHeight = 180;

    // Setting up the SVG
    svg.attr('width', width + 20).attr('height', chartHeight + 50);

    // Creating scale for the x-axis
    // scaleLinear creates straight line domain decides the range of input values and
    //  range is the interval of output values
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, chartWidth]);

    // Creating scale for the y-axis
    const yScale = d3.scaleLinear().domain([0, d3.max(data) || 0]).range([chartHeight+10, 0]);

    // Defining the line function
    // cteates line by setting x and y coordinates 
    const line = d3.line<number>().x((_, i) => xScale(i)).y(d => yScale(d)).curve(d3.curveCardinal);

    // setting up the axes
  // creates x-axis using xscale
    const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSizeInner(0).tickFormat(((d, i) => (i + 1).toString()) as (d: d3.NumberValue, i: number) => string);

    // Create a container group for the chart
    // <g> element is a container that is used to group other SVG elements
    const chart = svg.append('g');

    // Create clipping path
    // <defs> define reusable elements in SVG graphics.
    // <clipPath> mask the content within that region.
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'line-chart-clip-path')
      .append('rect')
      .attr('width', chartWidth + 6)
      .attr('height', chartHeight + 60);

    // Apply clipping path to the chart
    chart.attr('clip-path', 'url(#line-chart-clip-path)');

    // Draw the x-axis
    chart
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${chartHeight + 25})`)
      .selectAll('path')
      .style('display', 'none');

      const Tooltip = d3
      .select('body')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px');

    chart
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 3)
      .on('mouseover', (event, d) => {
        const bisect = d3.bisector((datum: number) => datum).left;
        const xMouse = xScale.invert(d3.pointer(event)[0]);
      
        const index = bisect(data, xMouse, 1);
        const closestDataPoint = data[index - 1];
      
        setTooltipVisible(true);
        setTooltipData(closestDataPoint);
      })
      // @ts-ignore
      .on('mousemove', (event: MouseEvent, d: number) => {
        if (tooltipRef.current && containerRef.current) {
          const [x, y] = d3.pointer(event);
          console.log(d,'kjghfhjoiuy')
          const yValue = yScale.invert(y);
          console.log('Y-Axis Value:', yValue);
      
          tooltipRef.current.style.transform = `translate(${x+10}px, ${y-150}px)`;
        }
      })
      .on('mouseout', () => {
        setTooltipVisible(false);
      });
  }, [data, width]);

  return (
    <div ref={containerRef} style={{ width: '90%' }}>
      <svg ref={svgRef} width={`${width}`} height="100%"/>
      {/* {tooltipVisible && (
        <div ref={tooltipRef} style={{ position: 'absolute', padding: '8px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {tooltipData !== null && <span>Value: {tooltipData}</span>}
        </div>
      )} */}
    </div>
  );
};

export default LineChart;
