import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import './App.css'

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [id, setid] = useState(0)
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }

  const handleAdd = () => {
    setid(id + 1)
    setTodos([...Todos, {id:id, Todo, isCompleted: false}]) // Todos = old list + new one
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
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

          <button onClick={handleAdd} className='bg-purple-b text-white-t rounded-md mx-2 px-3 cursor-pointer'>Add Now</button>
        </div>

        {/* show dynamically todos */}
        {/* start for dynamically show  */}
        {Todos.map(item => {


          return (<div key={item.id} className="btn h-10 my-4 hover:bg-white-b flex justify-between border-2  items-center rounded-2xl relative top-4">
            <div>
              <h3 className={`${item.isCompleted?"":"line-through"} px-4`} >{item.Todo}</h3>
            </div>
            <ul className='flex flex-row-reverse px-3 '>
              <li><button onClick={handleEdit} className='px-2 cursor-pointer  relative  hover:text-white-t hover:bg-purple-b rounded'>Edit</button></li>
              <li><button onClick={handleDelete} className='px-2 cursor-pointer relative  hover:text-white-t hover:bg-purple-b rounded' >Delete</button></li>
            </ul>
          </div>)
        })}
        {/* end for show dynamically  */}


      </div>



    </>
  )
}

export default App
