import React from "react";
import "./header.css"
const Header = () => {
 return (
  <div className="p-5" style={{background:"linear-gradient(180deg,#8f79f5,#4a2ec7) "}}>
      <div className="heading p-5" >
        <h1 className="pb-3 text-center">regular expression visualizer</h1>
        <hr className="horizontal-line"></hr>
        <p className="disc">using this tool you can get the diterminstic finite automata of regular expression and simulate that the given string belongs or not from regular expression</p>
      </div>
  </div>
);
};
export default Header;