<script>
  import { onMount } from "svelte";

  import { scalePoint, scaleLinear, scaleOrdinal } from "d3-scale";
  import { arc } from "d3-shape";
  import SinglesData from "$data/SinglesData.json";
  import CouplesData from "$data/CouplesData.json";
  import { scrollState } from "$stores/misc";

  let scrollPosition;

  scrollState.subscribe(value => {
    console.log(value);
    scrollPosition = value;

    if (scrollPosition == 1){
      addNodes()
    }

    if (scrollPosition == 3){
      addFirstLinks()
    }

    if (scrollPosition == 5){
      addAllLinks()
    }

    if(scrollPosition == 7){
      showRecouplings()
    }

    if(scrollPosition == 9){
      showNumberofDays()
    }
  });

  const season = "Love Island UK (Season 8)";
  
  const nodeData = SinglesData.filter(function(d){ return d.Season == season});
  const linkData = CouplesData.filter(function(d){ return d.values[0].Season == season });


  nodeData.sort(function(a, b) {
  if (a.Gender != b.Gender) { return a.Gender < b.Gender ? 1 : -1; }
  if ((a.Gender == b.Gender) && a.Gender == 'M' && +a.Entered != +b.Entered) {
    return +a.Entered > +b.Entered ? 1 : -1;
  } 
  if ((a.Gender == b.Gender) && a.Gender == 'F'  && +a.Entered != +b.Entered) {
    return +a.Entered < +b.Entered ? 1 : -1;
  } 
});
  
  let link = [];
  let node = [];
  
  
  let d3 = {
    scaleLinear,
    scaleOrdinal,
    arc,
    scalePoint
  };

  let svg;
  let width = 600;
  let height = 500;
  
  const colourScale = d3.scaleLinear().domain([0, 5, 9, 40])
    .range([100, 100, 30, 0]);

  const opacityLine = d3.scaleLinear().domain([0, 13, 14, 50])
    .range([0, 10, 30, 50]);
  const colourScaleLine = d3.scaleLinear().domain([0, 14, 15,50])
    .range(["black", "black", "lightgrey", "white"])
  const colourScaleWinner = d3.scaleOrdinal().domain(["Winner", "Runner-Up", "Third Place", "Fourth Place", "Dumped", "Walked"])
    .range(["black", "grey", "grey", "grey", "white", "white"]);
  const colourScaleGender = d3.scaleOrdinal().domain(["M", "F"])
    .range(["teal", "DeepPink"]);

 var allNodesNames = nodeData.map(function(d){return d.First_Name});
 var xScale = d3.scalePoint()
     .domain(allNodesNames)
     .range([10,width- 20]);

function addNodes(){

 node = nodeData;
 link = [];

}


function addFirstLinks(){

  let filteredlinkData = linkData.filter(function(d){ return +d.FirstCouplingDay < 15 });
   
  link = filteredlinkData.map(d => {
      return {
        source: d.values[0].Participant1,
        target: d.values[0].Participant2,
        chosen: 1,
        firstcouple: d.FirstCouplingDay,
        totaldays: 30,
      };
  });

   link.forEach(function(d){
     var index1 = nodeData.findIndex(x => x.First_Name === d.source);
     var index2 = nodeData.findIndex(x => x.First_Name === d.target);
     if(index1 < index2){
      d.index1 = index2;
      d.index2 = index1;
     } else{
      d.index2 = index2;
      d.index1 = index1;
     }
     var radius = 7.5*(d.index1-d.index2)

     d.arcPath = buildArc(d)
    })

  }

  function addAllLinks(){
  link = linkData.map(d => {
      return {
        source: d.values[0].Participant1,
        target: d.values[0].Participant2,
        chosen: 1,
        firstcouple: d.FirstCouplingDay,
        totaldays: 30,
      };
  });

   link.forEach(function(d){
     var index1 = nodeData.findIndex(x => x.First_Name === d.source);
     var index2 = nodeData.findIndex(x => x.First_Name === d.target);
     if(index1 < index2){
      d.index1 = index2;
      d.index2 = index1;
     } else{
      d.index2 = index2;
      d.index1 = index1;
     }
     var radius = 7.5*(d.index1-d.index2)

     d.arcPath = buildArc(d)
    })

  }

  function showRecouplings(){

    link = linkData.map(d => {
    return {
      source: d.values[0].Participant1,
      target: d.values[0].Participant2,
      chosen: d.TotalTimesChosen,
      firstcouple: d.FirstCouplingDay,
      totaldays:30
    };
  });

   link.forEach(function(d){
     var index1 = nodeData.findIndex(x => x.First_Name === d.source);
     var index2 = nodeData.findIndex(x => x.First_Name === d.target);
     if(index1 < index2){
      d.index1 = index2;
      d.index2 = index1;
     } else{
      d.index2 = index2;
      d.index1 = index1;
     }
     var radius = 7.5*(d.index1-d.index2)

     d.arcPath = buildArc(d)
    })

  }


function showNumberofDays(){

    link = linkData.map(d => {
    return {
      source: d.values[0].Participant1,
      target: d.values[0].Participant2,
      chosen: d.TotalTimesChosen,
      firstcouple: d.FirstCouplingDay,
      totaldays: 30+ d.TotalDays
    };
  });

   link.forEach(function(d){
     var index1 = nodeData.findIndex(x => x.First_Name === d.source);
     var index2 = nodeData.findIndex(x => x.First_Name === d.target);
     if(index1 < index2){
      d.index1 = index2;
      d.index2 = index1;
     } else{
      d.index2 = index2;
      d.index1 = index1;
     }
     var radius = 7.5*(d.index1-d.index2)

     d.arcPath = buildArc(d)
    })

  }

  function buildArc (d) {
     let start = xScale(nodeData[d.index2].First_Name);
     let end = xScale(nodeData[d.index1].First_Name);
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
        opacity = {opacityLine(arc.totaldays)+ "%"}
        stroke={colourScaleLine(arc.firstcouple)}
        stroke-width={arc.chosen}
      />
    </g>
  {/each}
  
  {#each node as point,i}
    <circle
      class="node"
      r="7"
      fill={colourScaleGender(point.Gender)}
      opacity = {colourScale(point.Entered) + "%"}
      stroke = {colourScaleWinner(point.Status)}
      stroke-width ={'1'}
      cx={xScale(point.First_Name)}
      cy={height - 40}
    >
      <title>{point.First_Name}</title></circle
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
