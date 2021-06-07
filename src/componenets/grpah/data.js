import React from "react";
import ReactFlow, { isNode } from "react-flow-renderer";
import dagre from "dagre";
import ret from "./dfa"
const position = { x: 0, y: 0 };
const edgeType = "smoothstep";
const dfa = ret[1];
let initialElements=[];
let addNode= function (dfa) 
{
    let count = 0;
    dfa.forEach((el) => 
    {
       let i=count;
  
        let node1 = {
          id: `${i}`,
          data: { label: "q"+count },
          style: { border: '1px solid blue', width: 35, height: 20 ,paddingTop: 0,fontSize:15,borderRadius:20},
          position : position
        };
        if(el.final===true)
        {
           node1.style={ border: '1px solid green',paddingTop: 0, width: 35, height: 20,color:'blue',borderRadius:20};
           node1.data={label: "q"+count+" finalstate" };
        }
        initialElements.push(node1);
        count++;
    });
};
let addEdge = function (dfa) {
  let count = 0;
  let id = dfa.length;
  dfa.forEach((el)=>
  {   
      
      let edge1 = {
      id: id++,
      source: count,
      target: el.a,
      type: "custom",
      label: "0",
      arrowHeadType: "arrowclosed",
      animated: true
    };
    let edge2 = {
      id: id++,
      source: count,
      target: el.b,
      type: "custom",
      label: "1",
      arrowHeadType: "arrowclosed",
      animated: true
    };
    initialElements.push(edge1);
    initialElements.push(edge2);
    count++;
  })
 
};
addNode(dfa);
addEdge(dfa);
const nodeWidth = 80;
const nodeHeight = 26;
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
console.log("raj");
const getLayoutedElements = (elements, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? "left" : "top";
      el.sourcePosition = isHorizontal ? "right" : "bottom";

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2
      };
    }

    return el;
  });
};
const layoutedElements = getLayoutedElements(initialElements);
export default layoutedElements;