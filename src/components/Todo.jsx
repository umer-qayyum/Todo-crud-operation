import React, { useState ,useEffect} from "react";
import "./style.css"
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const handleClick = () => {
    if (!inputData) {
      alert("Please fill some data");
    } 
    else if (inputData && toggleButton) {
        setItems(
          items.map((curElem) => {
            if (curElem.id === isEditItem) {
              return { ...curElem, name: inputData };
            }
            return curElem;
          })
        );
  
        setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
      }
    else {
      const newData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newData]);
      setInputData("");
    }
  };
  const deleteItems=(index)=>{
    const freshData=items.filter((val)=>{
        if(val.id!=index){
            return val;
        }
    })
    setItems(freshData);
  }

  const editItems=(index)=>{
    const updatedData=items.find((val)=>{
        if(val.id==index){
            return val;
        }
    })
    setInputData(updatedData.name)
    setIsEditItem(index)
    setToggleButton(true);
  }
  const removeAll=()=>{
    setItems([]);
  }



  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);



  return (
    <>
      <div className="container d-flex justify-content-center align-items-center  vh-100">
        <div className="main-div">
          <div className="child-div">
            <div className="  d-flex justify-content-center ">
                <img style={{width:"100px",height:"200px"}} src="./images/todo.svg"/>
            </div>
            
            <h2 className="mb-5">Add your items here ✌</h2>
            <div className="input-div d-flex mb-3">
              <input
                className="form-control"
                type="text"
                value={inputData}
                placeholder="✍ Add your items"
                onChange={(e) => setInputData(e.target.value)}
              />
              {toggleButton ? (
              <button
              className="ms-3 btn btn-primary"
              onClick={handleClick}
              style={{padding:"5px 10px",color:"black" ,backgroundColor:"transparent",border:"1px solid black"}}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            ) : (
                <button
                className="ms-3 btn btn-primary"
                onClick={handleClick}
                style={{padding:"5px 10px",color:"black" ,backgroundColor:"transparent",border:"1px solid black"}}
              >
                <i className="bi bi-plus-square"></i>
              </button>
            )}
              
            </div>
            <div className="showData " >
            {
                items.map((val)=>{
                    const {id , name}=val;
                    return(
                        <div className="list-items mt-2  p-3  d-flex" style={{border:"1px solid black",borderRadius:"18px"}} key={id}>
                        <h4>{name}</h4>
                        <div className="icons d-flex justify-content-end  w-100">
                          <button style={{padding:"5px 10px",color:"black" ,backgroundColor:"transparent",border:"1px solid black"}} onClick={()=>editItems(id)} className="me-3 btn btn-primary">
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn " style={{padding:"5px 10px",color:"black" ,backgroundColor:"transparent",border:"1px solid black"}} onClick={()=>deleteItems(id)}>
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    )
                   
                  
                })
            }
            </div>
            <div className="lastbtn mt-5 d-flex justify-content-center">
                <button onClick={removeAll} data-sm-link-text="Remove All" className="btn effect04">
                    <span>Check-List</span>
                </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
