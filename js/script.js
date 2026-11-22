//Seleção de elementos


const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#search-input")
const filterSelect = document.querySelector("#filter-select")

let todoIdToEdit;


//Funções

const saveTodo = (text, id = crypto.randomUUID(),done = false) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")
    todo.dataset.id = id
    if(done){
        todo.classList.add("done")
    }

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    

    todoInput.value = ""

    todoInput.focus()

    


}

const toggleForms = () => {

    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}





const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo)=> {
        let todoID = todo.dataset.id
        let todoTitle = todo.querySelector("h3")
        
        if(todoID===todoIdToEdit){
            todoTitle.innerText = text
        }
    })



}


//Local Sotorage


const updateLocalStorage = () => {

    const todos = document.querySelectorAll(".todo")

    const array = []

    todos.forEach((todo)=> {

        let id = todo.dataset.id
        let text = todo.querySelector("h3").innerText
        let done = todo.classList.contains("done")

        const todoObject = {
            id,
            text,
            done,
        }

        array.push(todoObject)

    })

    localStorage.setItem("todos",JSON.stringify(array))

}



//Load - Carregar os dados persisitentes

const loadTodos = () => {

    

    const todos = JSON.parse(localStorage.getItem("todos"))

    

    if(todos) {
        todos.forEach((todo) => {
            
            saveTodo(todo.text, todo.id, todo.done)
        })
    }

}




//Eventos



todoForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputValue = todoInput.value 

    if(inputValue){
        
        saveTodo(inputValue)
        updateLocalStorage()
    }

    
})





document.addEventListener("click", (e)=> {

    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){

        parentEl.classList.toggle("done")

        updateLocalStorage()
        
    }

    if(targetEl.classList.contains("remove-todo")){

        if(confirm("Remover tarefa?")){

        parentEl.remove()

        updateLocalStorage()

        }
    }


    if(targetEl.classList.contains("edit-todo")){
        toggleForms()
        editInput.value = todoTitle
        todoIdToEdit = parentEl.dataset.id
        
    }
})





cancelEditBtn.addEventListener("click", (e) => {

    e.preventDefault()

    toggleForms()
    
})






editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        
        updateTodo(editInputValue)

        updateLocalStorage()

    }

    toggleForms()

})


// Evento para pesquisa

searchInput.addEventListener("input", (e) => {

    const searchTerm = e.target.value.toLowerCase()

    const todos = document.querySelectorAll(".todo")

    

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3").innerText.toLowerCase()
        

        if(todoTitle.includes(searchTerm)){
            todo.classList.remove("hide")
        } else {
            todo.classList.add("hide")
        }
       
    })
    
})

// evento para filtro

filterSelect.addEventListener("change",(e) => {

    const filterValue = e.target.value

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        if(filterValue==="done"){

            if(todo.classList.contains("done")){
                todo.classList.remove("hide")
            } else {
                todo.classList.add("hide")
            }
            

        }


        if(filterValue==="todo"){
            if(!todo.classList.contains("done")){
                todo.classList.remove("hide")
            } else {
                todo.classList.add("hide")
            }
        }

        if(filterValue==="all"){
            todo.classList.remove("hide")
        }
    })


})



loadTodos()





