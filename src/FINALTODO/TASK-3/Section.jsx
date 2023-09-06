import React,{useState}  from 'react'

const Section = () => {
  const [Input, setInput] = useState("");
  const [SecondInput, setSecondInput] = useState("");
  const [Store, setStore] = useState([])
  //This state for displaying edit or normal
  const [isEdit, setisEdit] = useState(false);
  //TextOne For Input 
  const [editinput, seteditinput] = useState("")
  //TextTwo For Input
  const [editTwoinput, seteditTwoinput] = useState("")
  //Object For Storing Data
  const [FinalTodo, setFinalTodo] = useState({})

  ///Creating a New Function For Store The Data From input 

  function HandleSubmitOne(e) {
     e.preventDefault();
     //If The Input Field's Has Value This Function Will Work
     if(Input && SecondInput != "") { 
       setStore([...Store,{id:Store.length + 1, TextOne:Input.trim(),TextTwo:SecondInput.trim()}]
       )
       setInput("");
       setSecondInput("");
     }
     //Else Throw a Error Like Empty Field
     else { 
      alert("Please Fill The Input Field")
     }
  }
  
  //Handle Delete 
  function handleDelete(id) { 
    const DeleteFunction = Store.filter((FinalDelete) => {
       return FinalDelete.id != id 
    })
    setStore(DeleteFunction)
  }
  function HandelinputOne(e) { 
    setFinalTodo({...FinalTodo,TextOne:e.target.value});
  }
  function HandelinputTwo(e) {
    setFinalTodo({...FinalTodo,TextTwo:e.target.value})
  }
  function onclickedit(store) { 
    setisEdit(true);
    setFinalTodo({...store})
  }
  function HandleSecondSubmit(e) { 
      e.preventDefault();
      HandleMainFunction(FinalTodo.id, FinalTodo)
  }
  function HandleMainFunction(id, ubdated) {
      const editLine = Store.map((EditLines) => {
          return EditLines.id === id ? ubdated : EditLines
      }) 
      setStore(editLine);
      setisEdit(false)
  }
  return (
    <>
     <div className="container-fluid">
      <div className="row bg-dark text-center text-white-50 p-2 ">
        <div className="col-sm-">
           <h1>TODO_APPLICATION</h1>
        </div>
      </div>
     </div>
     <div className="container">
       <div className="row mt-5">
          <div className="col-sm-12">
          {isEdit ? 
          <form className='d-flex gap-2' onSubmit={HandleSecondSubmit}>
            <input className='form-control form-control-lg'  type="text" onChange={HandelinputOne} />
            <input className='form-control form-control-lg' type="text" onChange={HandelinputTwo} />
            <button className='btn btn-primary'>DONE</button> 
            <button onClick={() => (setisEdit(false))} className='btn btn-danger'>CANCEL</button>
          </form> 
          :
          <form onSubmit={HandleSubmitOne}>
            <div className="d-flex gap-3">
            <input onChange={(e) => (setInput(e.target.value))} placeholder='Enter The Project Name' type="text" className='form-control form-control-lg' />
            <input onChange={(e) => (setSecondInput(e.target.value))} placeholder='Enter The Project Description' type="text" className='form-control form-control-lg' />
            <button className='btn btn-primary'>SUBMIT</button>
            </div>
          </form>
          }
          </div>
       </div>
     </div>
     <div className="container mt-5">
        <div className="row text-white-50">
           {Store.map((final) => (
              <div className="col-sm-4 mt-2"  key={final.id}>
              <h6>Project Name: {final.TextOne}</h6>
              <h6>Project Description: {final.TextTwo}</h6>
              <button onClick={() => (onclickedit(final))} className='btn btn-secondary'>EDIT</button>
              <button onClick={() => (handleDelete(final.id))} className='btn ms-1 btn-danger'>Delete</button>
              </div>
           ))}
        </div>
     </div>
    </>
  )
}

export default Section