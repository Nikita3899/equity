import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer';



interface DataItem {
  category: string;
  value1: number;
  value2: number;
  index: number;
}

interface StackedBarChartProps{
  data : DataItem[];

}


const StackedBarChart: React.FC<StackedBarChartProps> = ({data}) => {
  const svgRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimensions(containerRef);


  useEffect(() => {

    const w = width || 600;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
                    .style('margin-top',20)
                   

    const keys = ['value1', 'value2'];

    // Stack the data
    const stack = d3.stack<DataItem>().keys(keys).value((d, key) => (d as any)[key]);
    const stackedData = stack(data);

    // Set up scales
    const xScale = d3.scaleBand().domain(data.map(d => d.category)).range([0,w + 5]).padding(0.8);
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

    // Draw the axes
    const xAxis = d3.axisBottom(xScale)
                    .tickSizeInner(0);;
    

    svg.append('g').attr('transform', 'translate(0,200)').call(xAxis)
            .selectAll('path')
            .style('display', 'none')
            .selectAll('.tick text')
            .style('fill', '#dedede');
   
  }, [data,width]);

  return (
    <div ref={containerRef}style={{width:'100%'}}>
      <svg ref={svgRef} width={`${width}`} height={250}/>
    </div>
  );
};

export default StackedBarChart;
