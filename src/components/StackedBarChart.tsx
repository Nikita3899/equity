import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer';

interface DataItem {
  category: string;
  value1: number;
  value2: number;
  index: number;
}

const data: DataItem[] = [
  { category: 'January', value1: 10, value2: 20, index:0 },
  { category: 'Feburary', value1: 45, value2: 10, index: 1 },
  { category: 'March', value1: 15, value2: 30, index: 2 },
  { category: 'April', value1: 30, value2: 40, index: 3},
  { category: 'May', value1: 45, value2: 10, index: 4 },
  { category: 'June', value1: 15, value2: 30, index: 5 },
];

const StackedBarChart = () => {
  const svgRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimensions(containerRef);


  useEffect(() => {

    const w = width || 600;
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
                    .style('margin-top',20);


    const keys = ['value1', 'value2'];

    // Stack the data
    const stack = d3.stack<DataItem>().keys(keys).value((d, key) => (d as any)[key]);
    const stackedData = stack(data);

    // Set up scales
    const xScale = d3.scaleBand().domain(data.map(d => d.category)).range([0,w]).padding(0.8);
    const yScale = d3.scaleLinear().domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1]) || 0]).range([200, 0]);


   // Set up colors
    const colorScale: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal<string>().domain(keys).range(['#01BB7D', '#1A53EE']);


    // Draw the bars
    svg
      .selectAll('.stacked-bar')
      .data(stackedData)
      .join('g')
      .attr('class', 'stacked-bar')
      .attr('fill', (d, i) => colorScale(keys[i]))
      .selectAll('rect')
      .data(d => d)
      .join('rect')
      .attr('x', d => xScale(data[d.data.index].category) || 0)
      .attr('y', d => yScale(d[1]) || 0)
      .attr('height', d => yScale(d[0]) - yScale(d[1]) || 0)
      .attr('width', xScale.bandwidth() || 0)
      .attr('rx', 8) // Set the horizontal border radius
      .attr('ry', 8);

    // Draw the axes
    const xAxis = d3.axisBottom(xScale)
                    .tickSizeInner(0);;
    

    svg.append('g').attr('transform', 'translate(0,200)').call(xAxis)  .selectAll('path')
            .style('display', 'none')
            .selectAll('text')
            .style('fill', '#dedede');
   
  }, [data,width]);

  return (
    <div ref={containerRef}style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <svg ref={svgRef} width={`${width}`} height={250}></svg>
    </div>
  );
};

export default StackedBarChart;
