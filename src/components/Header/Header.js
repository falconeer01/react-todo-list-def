import React from 'react'

function Header() {
  return (
    <div>
        <header className='header'>
            <h1>todos</h1>
            <form>
                <div>
                    <input 
                        className='new-todo'
                        placeholder='What needs to be done?'
                    />
                </div>
            </form>
        </header>
    </div>
  )
}

export default Header