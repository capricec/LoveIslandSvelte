<script>
  import { onMount } from "svelte";

  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { zoom, zoomIdentity } from "d3-zoom";
  import { schemeCategory10 } from "d3-scale-chromatic";
  import { select, selectAll } from "d3-selection";
  import { drag } from "d3-drag";
  import {forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide, forceRadial } from "d3-force";
  import SinglesData from "$data/SinglesData.json";
  import CouplesData from "$data/CouplesData.json";

  const season = "Love Island UK (Season 8)";
  
  const nodeData = SinglesData.filter(function(d){ return d.Season == season});

  const linkData = CouplesData.filter(function(d){ return d.values[0].Season == season });

  const xKey = 'Entered';
  const titleKey = 'First_Name';

  const nodesTransformed = nodeData.map(d => {
    return {
      id: d[titleKey],
      group: +d[xKey],
      status: d["Status"]
    };
  });
  
  const linksTransformed = linkData.map(d => {
    return {
      source: d.values[0].Participant1,
      target: d.values[0].Participant2,
      chosen: d.TotalTimesChosen,
      firstcouple: d.FirstCouplingDay,
      totaldays: d.TotalDays
    };
  });
  
  console.log(nodeData, nodesTransformed, linksTransformed )

  let d3 = {
    zoom,
    zoomIdentity,
    scaleLinear,
    scaleOrdinal,
    schemeCategory10,
    select,
    selectAll,
    drag,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
    forceCollide,
    forceRadial
  };

  let svg;
  let width = 500;
  let height = 500;
  const nodeRadius = 20;
  $: links = linksTransformed.map((d) => Object.create(d));
  $: nodes = nodesTransformed.map((d) => Object.create(d));
  //const colourScale = d3.scaleOrdinal(d3.schemeCategory10);
  const colourScale = d3.scaleLinear().domain([0, 5,50])
    .range(["green", "lightgreen", "white"]);
  const colourScaleLine = d3.scaleLinear().domain([0, 14, 15,50])
    .range(["black", "black", "lightgrey", "white"])
  const colourScaleWinner = d3.scaleOrdinal().domain(["Winner", "Runner-Up", "Third Place", "Fourth Place", "Dumped", "Walked"])
    .range(["black", "grey", "light grey", "white", "white", "white"]);
  let transform = d3.zoomIdentity;
  //$: console.log(transform);
  let simulation;
  onMount(() => {

    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceCollide().radius(5).iterations(3))
      .force("r", d3.forceRadial(400).strength(0))
      .on("tick", ticked)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .alphaTarget(0.1);

       function ticked() {
    nodes = [...nodes];
  }
  for(var a =0; a<1; a++){
    ticked();
  }
  

    /*simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).distance(function(d) {return 18+ d.totaldays*1.5}).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-13))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", simulationUpdate);
    /*d3.select(svg)
      .call(
        d3
          .drag()
          .container(svg)
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .call(
        d3
          .zoom()
          .scaleExtent([1 / 10, 8])
          .on("zoom", zoomed)
      );*/
  });
  function simulationUpdate() {
    simulation.tick();
    nodes = [...nodes];
    links = [...links];
  }
  function zoomed(currentEvent) {
    transform = currentEvent.transform;
    simulationUpdate();
  }
  function dragsubject(currentEvent) {
    const node = simulation.find(
      transform.invertX(currentEvent.x),
      transform.invertY(currentEvent.y),
      nodeRadius
    );
    if (node) {
      node.x = transform.applyX(node.x);
      node.y = transform.applyY(node.y);
    }
    return node;
  }
  function dragstarted(currentEvent) {
    if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
    currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
    currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
  }
  function dragged(currentEvent) {
    currentEvent.subject.fx = transform.invertX(currentEvent.x);
    currentEvent.subject.fy = transform.invertY(currentEvent.y);
  }
  function dragended(currentEvent) {
    if (!currentEvent.active) simulation.alphaTarget(0);
    currentEvent.subject.fx = null;
    currentEvent.subject.fy = null;
  }
  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>

<svelte:window on:resize={resize} />

<svg bind:this={svg} {width} {height}>
  <!--{#each links as link}
    <g>
      <line
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
        stroke={colourScaleLine(link.firstcouple)}
        stroke-width={link.chosen}
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
      >
        <title>{link.source.id}</title>
      </line>
    </g>
  {/each}-->

  {#each nodes as point}
    <circle
      class="node"
      r="10"
      fill={colourScale(point.group)}
      stroke = {colourScaleWinner(point.status)}
      stroke-width ={'1'}
      cx={point.x}
      cy={point.y}
      transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
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
