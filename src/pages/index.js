import React,{ useState } from 'react'; 
import BasicFlow from '../componenets/grpah/BasicFlow'
import Header from '../componenets/header/header'
import './index.css'
const Home = () => { 
    const [name, setName] = useState("");
    const [displayQuestions,setdisplayQuestions]= useState(false);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setdisplayQuestions(true);
        alert(`Submitting Name ${name}`)
    };
    let questions="";
    if (displayQuestions) 
    {
       questions = (
        <div>
            <BasicFlow regex={name}/>
        </div>
        )
   }
   else
   {
    questions = (
        <div>
            raj
        </div>
        )
   }
  return ( 
      <>
      <Header/>
    
            <div className="p-5">
                <div className="input-box">
                    <p>Enter the geular expression </p>
                    <p>Note:- regex expression should be fromat like ex.(110+11),1110*11+11,(11+110*11*+11)</p>
                    <form onSubmit={handleSubmit}>
                            <label>
                                Regular Expression:
                            </label>
                            <br></br>
                            <input
                                type="text"
                                value={name}
                                onChange={e => {setName(e.target.value)}}
                                style={{width:"80%"}}
                        
                                />
                                <br></br>
                            <input type="submit" value="Convert" />
                        </form>
                    </div>
                 </div>
              <div className=" p-5">
                  <div className="graph-box">
                   {questions}
                 </div>
            </div>
        
      
      </>
  ); 
}; 
  
export default Home;