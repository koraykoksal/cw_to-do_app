//********* Variables  */

const todoForm = document.getElementById('todoForm')
const currentDay = document.getElementById('today')
const todoText = document.getElementById('todoText')
const addBtn = document.getElementById('addBtn')

const taskBody=document.querySelector('.taskBody')

let taskList=[]



//****** Events */

//! sayfa yüklendiği zaman çalış
window.addEventListener('load',()=>{


    //?haftanın günü bilgisi
    whatisToday()

    taskList = JSON.parse(localStorage.getItem("taskList")) || []

    taskList.forEach((tlist) => taskDomaYaz(tlist))

    taskBody()

    console.log(taskList);

})

//! yeni task girildiğinde
todoForm.addEventListener('submit',(e)=>{

    e.preventDefault()


    const task={
        id:new Date().getTime(),
        data:todoText.value,
    }

    //? inputdan gelen değeri dizide sakla
    taskList.push(task)

    //?localstorage bilgiler kayıt edilir
    localStorage.setItem("taskList",JSON.stringify(taskList))

    //?doma yazma fonksiyonu çalışır
    taskDomaYaz(task)

    //?formu resetle
    todoForm.reset()

})


taskBody.addEventListener('click',(e)=>{


    if(e.target.classList.contains("btn-danger")){
        
        e.target.parentElement.remove()

        const id = e.target.id
        console.log(id)

        
        taskList=taskList.filter((task) => task.id != id)

        localStorage.setItem("taskList",JSON.stringify(taskList))

        taskDomaYaz()

    }

})


//****** Functions */

//?gün bilgisini çalıştıran fonksiyon
const whatisToday=()=>{


    const today=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let now=new Date()
    let dayNumber=now.getDay()
    const happy="Happy"

    document.getElementById('today').textContent=`Happy ${today[dayNumber]}` 


}


const taskDomaYaz=({data,id})=>{

    taskBody.innerHTML+=`
    <div class="d-flex gap-2 mb-1 toDo">
    <input id="gelir-input" class="form-control p-3" type="text" value="${data}" />
    <button id="${id}" type="submit" class="btn btn-danger p-3 font-weight-bold">X</button>
    </div>
    `

}