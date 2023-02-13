<script>
  import { onMount } from "svelte";

  import { scalePoint, scaleLinear, scaleOrdinal } from "d3-scale";
  import { arc } from "d3-shape";
  import SinglesData from "$data/SinglesData.json";
  import CouplesData from "$data/CouplesData.json";
  import SeasonsData from "$data/SeasonsData.csv";
  import { scrollState, chosenSeason } from "$stores/misc";

  let scrollPosition;
  let link = [];
  let node = [];
  let nodeData, linkData, allNodesNames, xScale;
  
  
  let d3 = {
    scaleLinear,
    scaleOrdinal,
    arc,
    scalePoint
  };

  let svg;
  let width = 600;
  let height = 450;

  chosenSeason.subscribe(value => {
    console.log(value);
    UpdateSeason(value);
  })


  scrollState.subscribe(value => {
    console.log(value);
    scrollPosition = value;

    if (scrollPosition == 0){
      addNodes()
    }

    if (scrollPosition == 1){
      colorNodes()
    }

    if (scrollPosition == 2){
      addAllLinksNoShading()
    }

    if (scrollPosition == 3){
      addAllLinks()
    }

    if (scrollPosition == 5){
    sizeNodes()
    console.log(node);
    }

    if(scrollPosition == 7){
      showRecouplings()
    }

    if(scrollPosition == 9){
      showNumberofDays()
    }
  });

  
  

  
  const colourScale = d3.scaleLinear().domain([0, 5, 9, 40])
    .range([100, 100, 20, 0]);
  const opacityLine = d3.scaleLinear().domain([0, 13, 14, 50])
    .range([50, 50, 10, 0]);
  const colourScaleLine = d3.scaleLinear().domain([0, 7,50, 51])
    .range(["white", "lightgrey", "lightgrey", "black"])
  const colourScaleWinner = d3.scaleOrdinal().domain(["Winner", "Runner-Up", "Third Place", "Fourth Place", "Dumped", "Walked"])
    .range(["black", "grey", "grey", "grey", "white", "white"]);
  const colourScaleGender = d3.scaleOrdinal().domain(["M", "F"])
    .range(["teal", "DeepPink"]);



function UpdateSeason(newSeason){
  let season = newSeason;

  seasonData=SeasonsData.filter(function(d){ return d.Season == season});
  console.log(seasonData);
  
  nodeData = SinglesData.filter(function(d){ return d.Season == season});
  linkData = CouplesData.filter(function(d){ return d.values[0].Season == season });


  nodeData.sort(function(a, b) {
    if (a.Gender != b.Gender) { return a.Gender < b.Gender ? 1 : -1; }
    if ((a.Gender == b.Gender) && a.Gender == 'M' && +a.Entered != +b.Entered) {
      return +a.Entered > +b.Entered ? 1 : -1;
    } 
    if ((a.Gender == b.Gender) && a.Gender == 'F'  && +a.Entered != +b.Entered) {
      return +a.Entered < +b.Entered ? 1 : -1;
    } 
  });

   allNodesNames = nodeData.map(function(d){return d.First_Name});
   xScale = d3.scalePoint()
       .domain(allNodesNames)
       .range([10,width- 20]);

  colorNodes()

}


function addNodes(){

 node = nodeData.map(d => {
      return {
        Gender: d.Gender,
        Entered: 1,
        Status: d.Status,
        First_Name: d.First_Name,
        Num_Couples: 1
      };
  });
 link = [];

}

function colorNodes(){

 node = nodeData.map(d => {
      return {
        Gender: d.Gender,
        Entered: d.Entered,
        Status: d.Status,
        First_Name: d.First_Name,
        Num_Couples: 1
      };
  });
 link = [];

}

function sizeNodes(){

 node = nodeData.map(d => {
      return {
        Gender: d.Gender,
        Entered: d.Entered,
        Status: d.Status,
        First_Name: d.First_Name,
        Num_Couples: +d.Num_Couples
      };
  });
 

}


  function addAllLinks(){
  link = linkData.map(d => {
      return {
        source: d.values[0].Participant1,
        target: d.values[0].Participant2,
        chosen: 1,
        firstcouple: d.FirstCouplingDay,
        totaldays: 51,
      };
  });

   addLinks(link);
  }

  function addAllLinksNoShading(){
  link = linkData.map(d => {
      return {
        source: d.values[0].Participant1,
        target: d.values[0].Participant2,
        chosen: 1,
        firstcouple: 13,
        totaldays: 51,
      };
  });

   addLinks(link);

  }

  function showRecouplings(){

    link = linkData.map(d => {
    return {
      source: d.values[0].Participant1,
      target: d.values[0].Participant2,
      chosen: d.TotalTimesChosen,
      firstcouple: d.FirstCouplingDay,
      totaldays:51
    };
  });

   addLinks(link);

  }


function showNumberofDays(){

    link = linkData.map(d => {
    return {
      source: d.values[0].Participant1,
      target: d.values[0].Participant2,
      chosen: d.TotalTimesChosen,
      firstcouple: d.FirstCouplingDay,
      totaldays: 35+ d.TotalDays
    };
  });

   addLinks(link);

  }

  function addLinks(dataset){
    dataset.forEach(function(d){
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
    //console.log(d.index1, d.index2);
     let start = xScale(nodeData[d.index2].First_Name);
     let end = xScale(nodeData[d.index1].First_Name);
     let curve = (start - end)/(1+ (51/35));
     //curve = (start - end)/2;

     const arcPath = ['M',            // start the path
              start, height-75,       // declare the (x,y) of where to start
             'A',                     // specify an eliptical curve
             curve, ',',    // xradius: height of arc is proportional to start - end
             (start - end)/2,         // yradius 
              0, 0, ",",              // rotation of ellipse is 0 along x and y; 
              start < end ? 1: 0,     // make all arcs curve above the nodes;
              end, height-75]         // declare (x,y) of endpoint
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
        opacity = {opacityLine(arc.firstcouple)+ "%"}
        stroke={colourScaleLine(arc.totaldays)}
        stroke-width={arc.chosen*1.5}
      />
    </g>
  {/each}
  
  {#each node as point,i}
    <circle
      class="node"
      r={(width/node.length/3)-2+point.Num_Couples*2}
      fill={colourScaleGender(point.Gender)}
      opacity = {colourScale(point.Entered) + "%"}
      stroke = {colourScaleWinner(point.Status)}
      stroke-width ={'1'}
      cx={xScale(point.First_Name)}
      cy={height - 70}
    >
    </circle>

    <g
      class="name-holder"
      transform={"translate(" +(xScale(point.First_Name)+4) + "," + (height-60) + ") rotate(-90)"}>
    <text
      class="name"
      text-anchor="end"
      opacity = {colourScale(point.Entered) + "%"}
    >{point.First_Name}</text>
  </g>

  {/each}
</svg>

<style>
  svg {
    float: left;
  }
  circle {
  }

  text{
    padding-top:5px;
    font-size: 12px;
  }
</style>
