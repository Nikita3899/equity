import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';

const LineChart = () => {
    const [data] = useState([67,98,78,90,89,89,96]);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(()=>{

        const w = 400;
        const h = 80;

        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .style('margin-top', 50)
                        .style('overflow', 'visible')
                       

       // Create a scale for the x-axis
        const xScale = d3.scaleLinear()
                        .domain([0, data.length - 1])
                        .range([0, w]);


      // Create a scale for the y-axis
        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(data) || 0]) // Use a default value if d3.max(data) is undefined
                        .range([h, 0])
                  
     // Define the line function
     const line = d3.line<number>()
                    .x((d, i) => xScale(i))
                    .y((d) => yScale(d))
                    .curve(d3.curveCardinal)

    // setting up the axes
     const xAxis = d3.axisBottom(xScale)
                    .ticks(data.length)
                    .tickFormat(((d, i) => (i + 1).toString()) as (d: d3.NumberValue, i: number) => string); 

     svg.append('g')
         .call(xAxis)
         .attr('transform', `translate(0,${h+30})`)

     svg.selectAll('.line')
         .data([data])
         .join('path')
         .attr('d', d => line(d))
         .attr('fill', 'none')
         .attr('stroke', 'blue')
    
    
    
    },[data])

    

  return (
    <div>
        <svg ref={svgRef}></svg>
      
    </div>
  )
}

export default LineChart
