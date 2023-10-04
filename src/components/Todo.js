import { useState } from "react";

function Todo() {
  //Default olarak gelen görevler
  const defaultTasks = [
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
  
  //Yeni görev adının tutulduğu hook:
  const [taskName, setTaskName] = useState("");

  //Tüm görevlerin tutulduğu görevler dizisi:
  let [tasks, setTasks] = useState(defaultTasks);

  //Aktif görevlerin sayısını tutan değişken:
  let [counter, setCounter] = useState(tasks.filter(task => !task.status).length);

  //Forma bir değer gönderildiğinde,
  const onSubmit = (e) => {
    const input = document.querySelector(".new-todo");

    //Sayfanın yenilenmesini engelle.
    e.preventDefault();

    //Input değeri boş ise hata gönder.
    if(input.value === ""){
        alert("Input can not be empty.");
        console.error("Empty input");
        return;   
    }

    //Yeni görev ekle.
    setTasks([...tasks, {id: Date.now(), name: taskName, status: false}]);
    setCounter(counter => counter + 1);

    //Inputunun değerini sıfırla.
    input.value = "";
    setTaskName("");
  }

  //Input içindeki değer değiştiğinde,
  const onChange = (e) => {
    //Inputun değerini klavyeden gelen karakterlere eşitle.
    const input = document.querySelector(".new-todo");
    input.innerHTML = e.target.value;

    //Görev adını klavyeden gelen karakterlere eşitle.
    setTaskName(e.target.value);
  }

  //Üzerine tıklanan görevlere completed classını ekleme veya kaldırma fonksiyonu:
  const toggle = (e) => {
    const task = e.currentTarget;
    const checkbox = task.querySelector('.toggle');
    const lblTask = task.querySelector('#lbl');

    if (task.classList.contains("completed")) {
        task.classList.remove("completed");
        lblTask.classList.remove("comp");
        checkbox.checked = false;
        setCounter(counter => counter + 1);
    } else if (!task.classList.contains("completed")) {
        task.classList.add("completed");
        lblTask.classList.add("comp");
        checkbox.checked = true;
        setCounter(counter => counter - 1);
    }
  }

  //Tıklandığında tüm görevlere completed classını ekleyen veya tümünden completed classını çıkaran fonksiyon:
  const toggleAll = () => {
    const liTasks = document.querySelectorAll('li');
    const liCheckboxes = document.querySelectorAll('.toggle');
    const lblTasks = document.querySelectorAll('#lbl');
    const isAllCompleted = Array.from(liTasks).every(liTask => liTask.classList.contains("completed"));

    liTasks.forEach(liTask => {
        if(!liTask.classList.contains("completed")){
            liTask.classList.add("completed");
            liCheckboxes.forEach(liCheckbox => liCheckbox.checked = true);
            lblTasks.forEach(lblTask => lblTask.classList.add('comp'));
            setCounter(0);
        }
        else if(isAllCompleted){
            liTask.classList.remove("completed");
            liCheckboxes.forEach(liCheckbox => liCheckbox.checked = false);
            lblTasks.forEach(lblTask => lblTask.classList.remove('comp'));
            setCounter(tasks.filter(task => task).length);
        }
    });
  }

  //Tüm türdeki görevleri gösteren fonksiyon:
  const showAll = () => {
    const liTasks = document.querySelectorAll('.todo-list li');

    liTasks.forEach(liTask => liTask.classList.remove('hidden'));
  }

  //Sadece aktif görevleri gösteren fonksiyon:
  const showActive = () => {
    const liTasks = document.querySelectorAll('.todo-list li');
  
    liTasks.forEach(liTask => {
      liTask.classList.toggle('hidden', liTask.classList.contains('completed'));
    });
  }

  //Sadece tamamlanmış görevleri gösteren fonksiyon:
  const showCompleted = () => {
    const liTasks = document.querySelectorAll('.todo-list li');
  
    liTasks.forEach(liTask => {
      liTask.classList.toggle('hidden', !liTask.classList.contains('completed'));
    });
  }

  //Tamamlanmış görevlerin hepsini silen fonksiyon:
  const clearCompleted = () => {
    const liTasks = document.querySelectorAll('.todo-list li');

    const taskLabels = document.querySelectorAll('.comp');
    let names = Array.from(taskLabels)
        .map(compTaskLabel => compTaskLabel.innerHTML);

    names.forEach(name => {
        tasks = tasks.filter(task => task.name !== name);
    });

    liTasks.forEach(liTask => {
        if (liTask.classList.contains('completed')) {
            liTask.remove();
        }
    });
  }

  return (
    <>
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={onSubmit}>
                    <input className="new-todo" onChange={onChange} placeholder="What needs to be done?" autoFocus />
                </form>
            </header>

            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label className="btn-toggle-all" htmlFor="toggle-all" onClick={toggleAll}>
                    Mark all as complete
                </label>
                
                <ul className="todo-list">
                    {
                        tasks.map((task) => (
                            <li key={task.id} 
                                className={task.status === true ? 'completed' : 'active'}
                                onClick={toggle}
                            >
                                <div className="view">
                                    <input className="toggle" type="checkbox" defaultChecked={task.status}/>
                                    <label id="lbl" className={task.status === true ? 'comp' : 'act'}>{task.name}</label>
                                    <button className="destroy"></button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <footer className="footer">
                <span className="todo-count">
                    <strong>{counter}</strong> items left
                </span>

                <ul className="filters">
                    <li onClick={showAll}>
                        <a href="#/" className="selected">All</a>
                    </li>
                    <li onClick={showActive}>
                        <a href="#/">Active</a>
                    </li>
                    <li onClick={showCompleted}>
                        <a href="#/">Completed</a>
                    </li>
                </ul>

                <button className="clear-completed" onClick={clearCompleted}>
                    Clear completed
                </button>
            </footer>
        </section>

        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </>
  )
}

export default Todo