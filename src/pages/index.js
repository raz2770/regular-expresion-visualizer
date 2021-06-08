import React,{ useState} from 'react'; 
import BasicFlow from '../componenets/grpah/BasicFlow'
import Checker from '../componenets/grpah/Checker';
import Header from '../componenets/header/header'
import './index.css'
const Home = () => { 
    const [regex, setRegex] = useState("");
    const [string, setString] = useState("");
    const [displayQuestions,setdisplayQuestions]= useState(false);
    const [displayString,setdisplayString]= useState(false);
    const [result,setResult]=useState("");
    const handleSubmitRegex = (evt) => {
        evt.preventDefault();
        setdisplayQuestions(true);
        alert(`Submitting Name ${regex}`)
    };
    const handleSubmitString = (evt) => {
        evt.preventDefault();
        setdisplayString(true);
        if (displayQuestions) 
        {
        setResult((
            <p style={{background:"white",borderRadius:"5px", padding:"5px"}}>
               <Checker regex={regex} string={string}/>
            </p>
            ))
        }
        else
        {
            setResult((
                <div style={{background:"white",borderRadius:"5px", padding:"5px"}}>
                   <p>first convert regular expresssion to dfa</p>
                </div>
                )) 
        }
        alert(`Submitting Name ${string}`)
    };
    let questions="";
    if (displayQuestions) 
    {
       questions = (
        <div>
            <BasicFlow regex={regex}/>
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
     
      <div className="main-container-home">
      <Header/>      
       
            <div className="row ">
                <div className="col-12 col-md-7">
                    <div className="p-3" >
                         <div className="input-box input-box-reg bg-white">
                            <p>Enter the regular expression </p>
                            <p>Note:- regex expression should be fromat like ex.(110+11),1110*11+11,(11+110*11*+11)</p>
                            <form onSubmit={handleSubmitRegex}>
                            <label>
                                Regular Expression:
                            </label>
                            <br></br>
                            <input
                                type="text"
                                value={regex}
                                onChange={e => {setRegex(e.target.value)}}
                                style={{width:"80%"}}
                        
                                />
                                <br></br>
                            <input type="submit" value="Convert" />
                        </form>
                       
                    </div>
                 </div>
                </div>
                <div class="col-12 col-md-5">
                <div className="p-3">
                <div className="input-box bg-white">
                    <p>Enter the string to check if it belongs to the given regular expression</p>
                    <p>Note:- string should be fromat like ex. 11011,11101111,1111100111</p>
                    <form onSubmit={handleSubmitString}>
                            <label>
                                Regular Expression:
                            </label>
                            <br></br>
                            <input
                                type="text"
                                value={string}
                                onChange={e => {setString(e.target.value)}}
                                style={{width:"80%"}}
                        
                                />
                                <br></br>
                            <input type="submit" value="Check" />
                        </form>
                        
                    </div>
                 </div>
                </div>
            </div>
            <div className="text-center"> 
                {result} 
            </div>
           
              <div className="p-3">
                  <div className="graph-box">
                   {questions}
                 </div>
            </div>
      
      </div>
  ); 
}; 
  
export default Home;