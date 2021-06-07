import React,{ useState} from "react";
import ReactFlow from "react-flow-renderer";
import layoutedElements from './data';
const BasicFlow = () => {
const [elements, setElements] = useState(layoutedElements);
 return (
  <div style={{ height: 800 }}>
    <ReactFlow elements={elements} />
  </div>
);
};
export default BasicFlow;