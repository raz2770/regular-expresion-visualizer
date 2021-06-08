import React,{ useState } from 'react'; 
import BasicFlow from '../componenets/grpah/BasicFlow'
import Header from '../componenets/header/header'
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
  return ( 
      <>
      <Header/>
      <div className="conatiner">
          <div className="row">
            <div className="col-6">
           <form onSubmit={handleSubmit}>
                <label>
                    Regular Expression:
                </label>
                <br></br>
                <input
                    type="text"
                    value={name}
                    onChange={e => {setName(e.target.value)}}
                    />
                <input type="submit" value="Submit" />
            </form>
            </div>
              <div className="col-6">
              {questions}
            </div>
          </div>
      </div>
      </>
  ); 
}; 
  
export default Home;