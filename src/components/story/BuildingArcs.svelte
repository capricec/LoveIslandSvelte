<script>
  import { onMount } from "svelte";

  import { scalePoint, scaleLinear, scaleOrdinal } from "d3-scale";
  import { zoomIdentity } from "d3-zoom";
  import { arc } from "d3-shape";
  import SinglesData from "$data/SinglesData.json";
  import CouplesData from "$data/CouplesData.json";

  const season = "Love Island UK (Season 8)";
  
  const nodeData = SinglesData.filter(function(d){ return d.Season == season});
  const linkData = CouplesData.filter(function(d){ return d.values[0].Season == season });

  const xKey = 'Entered';
  const titleKey = 'First_Name';

  const node = nodeData.map(d => {
    return {
      id: d[titleKey],
      entered: +d[xKey],
      status: d["Status"],
      gender: d["Gender"]
    };
  });

  node.sort(function(a, b) {
  if (a.gender != b.gender) {
    return a.gender < b.gender ? 1 : -1;
  }
  if ((a.gender == b.gender) && a.gender == 'M' && a.entered != b.entered) {
    return a.entered > b.entered ? 1 : -1;
  } 

  if ((a.gender == b.gender) && a.gender == 'F'  && a.entered != b.entered) {
    return a.entered < b.entered ? 1 : -1;
  } 

});
  
  const link = linkData.map(d => {
    return {
      source: d.values[0].Participant1,
      target: d.values[0].Participant2,
      chosen: d.TotalTimesChosen,
      firstcouple: d.FirstCouplingDay,
      totaldays: d.TotalDays
    };
  });

  console.log(node);
  

  let d3 = {
    zoomIdentity,
    scaleLinear,
    scaleOrdinal,
    arc,
    scalePoint
  };

  let transform = d3.zoomIdentity;

  let svg;
  let width = 600;
  let height = 500;
  
  const colourScale = d3.scaleLinear().domain([0, 40])
    .range([100, 0]);
  const colourScaleLine = d3.scaleLinear().domain([0, 14, 15,50])
    .range(["black", "black", "lightgrey", "white"])
  const colourScaleWinner = d3.scaleOrdinal().domain(["Winner", "Runner-Up", "Third Place", "Fourth Place", "Dumped", "Walked"])
    .range(["black", "grey", "grey", "grey", "white", "white"]);

    const colourScaleGender = d3.scaleOrdinal().domain(["M", "F"])
    .range(["teal", "pink"]);

 const arcGen = arc();

 var allNodesNames = node.map(function(d){return d.id});
 var xScale = d3.scalePoint()
     .domain(allNodesNames)
     .range([10,width- 20]);

 function buildArc (d) {
     let start = xScale(node[d.index2].id);
     let end = xScale(node[d.index1].id);
     let curve = (start - end)/(1+ (d.totaldays/30));
     //curve = (start - end)/2;

     const arcPath = ['M',            // start the path
              start, height-50,       // declare the (x,y) of where to start
             'A',                     // specify an eliptical curve
             curve, ',',    // xradius: height of arc is proportional to start - end
             (start - end)/2,         // yradius 
              0, 0, ",",              // rotation of ellipse is 0 along x and y; 
              start < end ? 1: 0,     // make all arcs curve above the nodes;
              end, height-50]         // declare (x,y) of endpoint
           .join(' ');                // convert the bracketed array into a string
     return arcPath;
  };

 link.forEach(function(d){
   var index1 = node.findIndex(x => x.id === d.source);
   var index2 = node.findIndex(x => x.id === d.target);
   if(index1 < index2){
    d.index1 = index2;
    d.index2 = index1;
   } else{
    d.index2 = index2;
    d.index1 = index1;
   }
   var radius = 7.5*(d.index1-d.index2)
   /*d.arcPath = arcGen({
      innerRadius: 0,
      outerRadius: radius,
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2, // radians
    });
   d.place = "transform:translate(" + (10+ (d.index2 + (d.index1 - d.index2)/2)*15) + "px,395px)"*/

   d.arcPath = buildArc(d)
  })

  console.log(link);
  
  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>

<svelte:window on:resize={resize} />

<svg bind:this={svg} {width} {height}>
  {#each link as arc}
    <g>
      <path
        d={arc.arcPath}
        fill={"none"}
        opacity = {'50%'}
        stroke={colourScaleLine(arc.firstcouple)}
        stroke-width={arc.chosen}
        style={arc.place}
      />
    </g>
  {/each}

  <g>
      <line
        stroke={"white"}
        stroke-width={'8'}
        x1="0" 
        y1={height - 45} 
        x2={width} 
        y2={height - 45} 
      />
    </g>
  
  {#each node as point,i}
    <circle
      class="node"
      r="7"
      fill={colourScaleGender(point.gender)}
      opacity = {colourScale(point.entered) + "%"}
      stroke = {colourScaleWinner(point.status)}
      stroke-width ={'1'}
      cx={xScale(point.id)}
      cy={height - 40}
    >
      <title>{point.id}</title></circle
    >
  {/each}
</svg>

<style>
  svg {
    float: left;
  }
  circle {
  }
</style>
