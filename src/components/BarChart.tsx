import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';


const BarChart = () => {
    const [data] = useState([56,88,90,67,23]);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(()=>{

        const w = 400;
        const h = 80;

        // setting the svg
        const svg = d3.select(svgRef.current)
                      .attr('width',w)
                      .attr('height',h)
                      .style('margin-top', 50)
                      .style('overflow','visible') //boundaries

        // setting the scales

        const xScale = d3.scaleBand()     //FIXME : why
                        .domain(data.map((_, i) => i.toString()))
                        .range([0,w])   //in terms of pixels
                        .padding(0.5)

        const yScale = d3.scaleLinear()
                        .domain([0,h])
                        .range([h,0])

        // setting the axes 

        const xAxis = d3.axisBottom(xScale)
                        .ticks(data.length)
        
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0,${h+30})`)
                       
        // setting data in svg
        const bars = svg.selectAll('.bar')
    .data(data);

  bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (_, i) => xScale(String(i)) || 0)
    .attr('y', yScale)
    .attr('width', xScale.bandwidth())
    .attr('height', val => h - yScale(val));

  bars
    .attr('x', (_, i) => xScale(String(i)) || 0)
    .attr('y', yScale)
    .attr('width', xScale.bandwidth())
    .attr('height', val => h - yScale(val));

  bars.exit().remove();
        
        
    },[data])
  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default BarChart

