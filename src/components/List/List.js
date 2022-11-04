import React from 'react'

function List() {

//   const default_tasks = [
//     {
//         id: 1,
//         name: 'Learn JavaScript',
//     }
//   ]

  return (
    <div>
        <section className='main'>
            <input className='toggle-all'
                   type='checkbox'
            />
            <label htmlFor='toggle-all'>
                Mark all as complete
            </label>
            <ul className="todo-list">

            </ul>
        </section>
    </div>
  )
}

export default List