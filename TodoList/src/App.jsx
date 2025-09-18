import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  // const [id, setid] = useState(0)

  useEffect(() => {

    /*  JSON.parse(...) → changes that string back into a JavaScript array. 
    So now todos = ["Buy milk","Go gym"].  
    localStorage.getItem("Todos") → gets the saved value from browser storage. 
    
  In short:--

    JSON.stringify = object/array → string (save)

    JSON.parse = string → object/array (read back)
    */
    let todostr = localStorage.getItem("Todos");
    if(todostr){

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


  return (
    <>
      <Navbar />
      <div className="container mx-auto text-white-t bg-purple-b my-5 rounded-xl px-2 ">
        <div>

          <div className='flex justify-between p-2 '>

            <h1 className='font-bold text-xl '>Your Todos</h1>
            <div className="AddTodo">
              <h1 className="text-lg  rounded-2xl px-2 py-1  font-bold  text-[15px] hover:text-black-t hover:bg-white-b cursor-pointer"> Add New </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="Todos bg-lightPurple-b mx-30 rounded-2xl px-2 text-xl min-h-[80vh] top-2">
        <div className="new-add-todo flex relative top-2">

          <div className="input bg-white-b w-fit">
            <input type="text" onChange={handleChange} value={Todo} />
          </div>

          <button onClick={handleAdd} className='bg-purple-b text-white-t rounded-md mx-2 px-3 cursor-pointer'>Add Now / Save </button>
        </div>

        {/* show dynamically todos */}
        {/* start for dynamically show  */}
        {Todos.length === 0 && <h1 className='my-20'>Not Available Any Your Todos</h1>}
        {Todos.map(item => {

          return (
            <div key={item.id} className="btn h-full my-4 hover:bg-white-b flex justify-between border-2  items-center rounded-2xl relative top-4">
              <div className='flex mx-4 gap-5'>
                <input type="checkbox"  checked={item.isCompleted}   onChange={handleCheckbox} value={item.isCompleted} name={item.id} id="" />
                <h3 className={`${item.isCompleted ? "line-through" : ""} px-4 my-3 text-justify`} >{item.Todo}</h3>
              </div>
              <ul className='flex flex-row-reverse px-3 '>
                {/* <li><button onClick={handleEdit} className='px-2 cursor-pointer  relative  hover:text-white-t hover:bg-purple-b rounded'>Edit</button></li>
              <li><button onClick={handleDelete} className='px-2 cursor-pointer relative  hover:text-white-t hover:bg-purple-b rounded' >Delete</button></li> */}
                <li><button onClick={(e) => { handleEdit(e, item.id) }} className='px-2 cursor-pointer  relative  hover:text-white-t hover:bg-purple-b rounded'>Edit</button></li>
                <li><button onClick={(e) => { handleDelete(e, item.id) }} className='px-2 cursor-pointer relative  hover:text-white-t hover:bg-purple-b rounded' >Delete</button></li>
              </ul>
            </div>)
        })}
        {/* end for show dynamically  */}
      </div>



    </>
  )
}

export default App
