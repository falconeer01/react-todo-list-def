import React from 'react'
import Header from './Header/Header'
import List from './List/List'
import Footer from './Footer/Footer'

function todo() {
  return (
    <div>
        <section>
            <Header />
            <List />
            <Footer />
        </section>

        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </div>
  )
}

export default todo