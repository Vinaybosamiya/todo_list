import React from 'react'

const navbar = () => {
    return (
        <nav className='flex justify-between bg-purple1-b text-white-t '>
            <div className="logo relative mx-3 top-4">
                <span className='font-bold text-xl '>Krishna Vibes</span>
            </div>
            <ul className="flex items-center gap-8 mx-7 p-4 cursor-pointer">
                {/* <li><span className='rounded-2xl px-2 py-1 sm:font-[12px] sm:gap-1 font-bold  text-[15px] hover:text-black-t hover:bg-white-b  '>Home</span></li>
                <li><span className='rounded-2xl px-2 py-1 sm:font-[12px] sm:gap-1 font-bold  text-[15px] hover:text-black-t hover:bg-white-b  '>About</span></li> */}
                
                <li><span className='rounded-2xl px-2 py-1 font-bold  text-[15px] hover:text-black-t hover:bg-white-b  '>Your Task</span> </li>

            </ul>

        </nav>
    )
}

export default navbar
