// Querying the elements
const textInput = document.getElementById("textInput");
const addTask = document.getElementById("addTaskbtn");
const taskList = document.getElementById("taskList")

let list =[];

//On click on add Task button, the input text should be added 

addTask.addEventListener("click",addingTask);

function addingTask()
{
if(textInput.value === "")
{
    alert("Please enter the task")
}
else{
const taskText = textInput.value;
   
    // to show the taskText need to show in list

    const li = document.createElement("li");
    li.textContent = taskText;
    //adding edit button to the list
    const editBtn = document.createElement("button");
    editBtn.textContent ="Edit"
    //adding event listiner for edit button to edit
    editBtn.addEventListener('click',()=>editLi(li,taskText));
    editBtn.classList.add("ebtn");
    //adding delete button to the list
    const delBtn = document.createElement("button")
    delBtn.textContent ="Delete"
    delBtn.addEventListener('click',()=>delLi(li,taskText));
    delBtn.classList.add("dbtn");
    taskList.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    //pushing it to the list array

    list.push(taskText);

    //Clear the inputext after pushing it to array

    textInput.value ="";
    console.log(list);


}
}

function editLi(li,taskText){

    const index = list.indexOf(taskText);
    const oldText = list[index];
    const editText = prompt("Edit your task",oldText);
    const newText = editText.trim();
    //updated the array
    list[index] = newText;
  

    


    


}

function delLi(li,taskText){
    //getting the index of the taskText from the array
const index = list.indexOf(taskText);
//removing from array
list.splice(index,1);
// removing from list in UI
li.remove();
}


