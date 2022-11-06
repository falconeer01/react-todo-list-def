import {useState} from 'react'

function Todo() {

    const default_tasks = [
        {
            id: 1,
            name: 'Learn JavaScript',
            status: true
        },
        {
            id: 2,
            name: 'Learn React',
            status: false
        },
        {
            id: 3,
            name: 'Get a life',
            status: false
        }
      ];
      
      const [liste, setListe] = useState(default_tasks);
      const [yeniGorev, setyeniGorev] = useState('');

      const addNewTask = (title) => {
        setListe([...liste, {id: Date.now(), name: title, status: false}]);
        setyeniGorev('');
      }

      const markAsCompleted = (id) => {
        setListe(liste.map((el) => 
            el.id === id ? {...el, status: !el.status} : el
            ))
      }

      const clearCompleted = () => {
        setListe(liste.filter((item) => (!item.status)))
      }

      let a = liste.filter((item)=>(
        !item.status
      ));
      let completedCount = a.length;

  return (
    <div>
        <section>
        <div>
        <header className='header'>
            <h1>todos</h1>
            <form onChange={(e) => e.preventDefault()}
                  onSubmit={()=>addNewTask(yeniGorev)}
            >
                <div>
                    <input 
                        value={yeniGorev}
                        onChange={(e)=>{setyeniGorev(e.target.value)}}
                        className='new-todo'
                        placeholder='What needs to be done?'
                    />
                </div>
            </form>
        </header>
    </div>
    <div>
        <section className='main'>
            <input className='toggle-all'
                   type='checkbox'
            />
            <label htmlFor='toggle-all'>
                Mark all as complete
            </label>
            <ul className="todo-list" id='main-ul'>
                {
                    liste.map((item) => 
                        <li className={item.status === true ? 'completed' : 'active'}
                            key={item.id}
                            onClick={() => markAsCompleted(item.id)}>
                            <div className='view'>
                                <input className='toggle'
                                        type='checkbox'  
                                />
                                <label>{item.name}</label>
                                <button className='destroy'></button>
                            </div>
                        </li>
                    )
                }
            </ul>
        </section>
    </div>
            <div>
        <footer className="footer">
            <span className="todo-count">
                <strong>{completedCount} </strong>tasks left
            </span>
            <ul className="filters">
                <li>
                    <a href="#/" className='active' onClick={() =>{
                        let main_ul = document.getElementById('main-ul');
                        let main_li_items = main_ul.getElementsByTagName('li');
                        for(let i = 0; i < main_li_items.length; i++){
                            if(main_li_items[i].classList.contains('hidden')){
                                main_li_items[i].classList.remove('hidden')
                            }
                        }
                    }}>All</a>
                </li>
                <li>
                    <a href="#/" className='active' onClick={() =>{
                        let main_ul = document.getElementById('main-ul');
                        let main_li_items = main_ul.getElementsByTagName('li');
                        for(let i = 0; i < main_li_items.length; i++){
                            if(main_li_items[i].classList.contains('completed')){
                                main_li_items[i].classList.add('hidden')
                            }
                            else if(main_li_items[i].classList.contains('hidden', 'active')){
                                main_li_items[i].classList.remove('hidden')
                            }
                        }
                    }}>Active</a>
                </li>
                <li>
                    <a href="#/" className='active' onClick={() =>{
                        let main_ul = document.getElementById('main-ul');
                        let main_li_items = main_ul.getElementsByTagName('li');
                        for(let i = 0; i < main_li_items.length; i++){
                            if(main_li_items[i].classList.contains('active')){
                                main_li_items[i].classList.add('hidden')
                            }
                            else if(main_li_items[i].classList.contains('hidden', 'completed')){
                                main_li_items[i].classList.remove('hidden')
                            }
                        }
                    }}>Completed</a>
                </li>
            </ul>
            <button className="clear-completed"
                    onClick={() => clearCompleted()}
            >
                Clear completed
            </button>
        </footer>
    </div>
        </section>

        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </div>
  )
}



export default Todo