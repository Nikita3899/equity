import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDimensions } from './ResponsiveContainer'; 

interface BarChartProps {
  data : number[]
}

const BarChart: React.FC<BarChartProps> = ({data}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<number | null>(null);
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

       svg
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0,${h + 30})`)
        .selectAll('path')
        .style('display', 'none');

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
        .attr('fill', 'blue')
        .on('mouseover', (event, d) => {
          setTooltipVisible(true);
          setTooltipData(d);
        })
        .on('mousemove', (event: MouseEvent, d: number) => {
          if (tooltipRef.current && containerRef.current) {
            const [x, y] = d3.pointer(event);
            console.log(d,'kjghfhjoiuy')
        
            tooltipRef.current.style.transform = `translate(${x-350}px, ${y+10}px)`;
          }
        })
        .on('mouseout', () => {
          setTooltipVisible(false);
        });
    };

    drawChart(); 

  }, [data, width]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display:'flex', alignItems:'center',justifyContent:'center' }}>
      <svg ref={svgRef}></svg>
      {tooltipVisible && (
        <div ref={tooltipRef} style={{ position: 'absolute', padding: '8px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {tooltipData !== null && <span>Value: {tooltipData}</span>}
        </div>
      )}
    </div>
  );
};

export default BarChart;
