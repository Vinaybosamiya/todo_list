import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {

    /*  JSON.parse(...) → changes that string back into a JavaScript array. 
    So now todos = ["Buy milk","Go gym"].  
    localStorage.getItem("Todos") → gets the saved value from browser storage. 
    
  In short:--

    JSON.stringify = object/array → string (save)

    JSON.parse = string → object/array (read back)
    */
    let todostr = localStorage.getItem("Todos");
    if (todostr) {

      let todos = JSON.parse(todostr)
      setTodos(todos)
    }
  }, [])



  const saveToLS = (p) => {
    /* 
    JSON.stringify(Todos) → changes your JavaScript array into a string.
Example: ["Buy milk","Go gym"] → "["Buy milk","Go gym"]".

localStorage.setItem("Todos", ...) → saves that string in browser storage under the name "Todos".


  In short:--

  JSON.stringify = object/array → string (save)

  JSON.parse = string → object/array (read back)
    */
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  const handleEdit = (e, id) => {
    let t = Todos.filter(i => i.id === id)
    setTodo(t[0].Todo);

    let newTodos = Todos.filter(item => {
      return item.id !== id   // 2 !== 2
    });

    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e, id) => {

    let newTodos = Todos.filter(item => {
      return item.id !== id   // 2 !== 2
    });

    setTodos(newTodos);
    saveToLS();

  }

  const handleAdd = () => {
    // setid(id + 1)  
    // in bellow obj show "isCompleted" is decide to which todo throw a line on text when check the check box
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]) // Todos = old list + new one
    setTodo("");
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(items => { // this function is return index of a each line
      return items.id === id;  // it is return index of checkbox and todo list items
    })
    let newTodos = [...Todos];
    newTodos[index]; // it is return element inside newTodos at position index
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos);
    // console.log(id)
    saveToLS();
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)

  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto text-white-t bg-purple-b my-5 rounded-xl px-2 sm:px-4 md:px-6 w-full ">
        <div>

          <div className='flex justify-between p-2 '>

            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>Your Todos</h1>
            <div className="AddTodo">
              <h1 className="text-lg  rounded-2xl px-2 py-1  font-bold  text-[15px] hover:text-black-t hover:bg-white-b cursor-pointer"> Add New </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="Todos bg-lightPurple-b mx-4 rounded-2xl px-2 text-xl min-h-[80vh] top-2 ">
        {/* <div className="Todos bg-lightPurple-b mx-4 sm:mx-6 md:mx-10 lg:mx-20 rounded-2xl px-2 sm:px-4 md:px-6 text-xl min-h-[80vh] mt-2"></div> */}
        <div className="flex flex-col sm:flex-row items-center w-full m-0 p-0 gap-7">
  <h1 className="relative top-5 sm:mx-4 md:mx-6 sm:my-6 md:my-9 font-bold 2xl:text-2xl sm:text-sm">
    Add New Todos
  </h1>
  <div className="block md:hidden">
    <input onChange={toggleFinished} type="checkbox" className="relative bottom-[3px]" checked={showFinished}/>
    <label htmlFor="FinishTask" className="mx-2 w-full sm:w-48 text-center sm:text-left">
      Finished Task
    </label>
  </div>
</div>


        <div className="new-add-todo flex relative top-2 w-full">






          <div className='flex  bottom-9  w-full justify-between'>

            <div className='flex'>
              <input type="text" className='border input bg-white-b w-fit' onChange={handleChange} value={Todo} />
              {/* <button onClick={handleAdd} disabled={Todo.length === 0} className={`hover:bg-purple-b text-white-t rounded-md mx-2 px-3 cursor-pointer bg-light-purple-b  ${Todo.length === 0 ? "bg-light-purple-b" : "bg-purple-b "}`}>Add Now / Save </button> */}
              <button onClick={handleAdd} disabled={Todo.length === 0} className={`hover:bg-purple-b text-white-t rounded-md mx-2 px-3 cursor-pointer bg-light-purple-b md:bg-purple1-b md:bg-purple1-b ${Todo.length === 0 ? "bg-light-purple-b" : "bg-purple-b "}`}> Save </button>
            </div>
            <input onChange={toggleFinished} type="checkbox" className='hidden sm:block relative bottom-[3px]' checked={showFinished} />


          </div>
          <label htmlFor="FinishTask" className="mx-2 w-48 hidden sm:block">
            Finished Task
          </label>


        </div>
        <h1 className='relative top-5 mx-4 my-6 font-bold'>Your Todos </h1>
        {/* show dynamically todos */}
        {/* start for dynamically show  */}
        {Todos.length === 0 && <h1 className='my-20'>Not Available Any Your Todos</h1>}
        {Todos.map(item => {

          return (
            (showFinished || !item.isCompleted) &&
            <div key={item.id}>
              <div className="btn h-full my-4 hover:bg-white-b flex justify-between border-2  items-center rounded-2xl relative top-4">

                <div className='flex mx-4 gap-5'>

                  <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} id="" />
                  <h3 className={`${item.isCompleted ? "line-through" : ""} px-4 my-3 text-justify`} >{item.Todo}</h3>
                </div>
                <ul className='flex flex-row-reverse px-3 '>
                  {/* <li><button onClick={handleEdit} className='px-2 cursor-pointer  relative  hover:text-white-t hover:bg-purple-b rounded'>Edit</button></li>
              <li><button onClick={handleDelete} className='px-2 cursor-pointer relative  hover:text-white-t hover:bg-purple-b rounded' >Delete</button></li> */}
                  <li><button onClick={(e) => { handleEdit(e, item.id) }} className='px-2 cursor-pointer  relative  hover:text-white-t hover:bg-purple-b rounded'>Edit</button></li>
                  <li><button onClick={(e) => { handleDelete(e, item.id) }} className='px-2 cursor-pointer relative  hover:text-white-t hover:bg-purple-b rounded' >Delete</button></li>
                </ul>
              </div>
            </div>)
        })}
        {/* end for show dynamically  */}
      </div>



    </>
  )
}

export default App
