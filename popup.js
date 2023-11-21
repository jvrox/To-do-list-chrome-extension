document.addEventListener("DOMContentLoaded",function(){
    const tasklist=document.getElementById("tasklist");
    const taskinput=document.getElementById("taskinput");
    const addtaskb=document.getElementById("addtask");

    addtaskb.addEventListener("click",function(){
        const tasktext=taskinput.value.trim();
        if(tasktext !==""){
            const taskitem=document.createElement("li");
            const checkbox=document.createElement("input");
            checkbox.type="checkbox";
            //creatinga new task item
            const label=document.createElement("label");
            label.textContent=tasktext;

            //append
            taskitem.appendChild(checkbox);
            taskitem.appendChild(label);

             // Add "edit" button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("editb");

            editButton.addEventListener("click", function () {
                // Check if the task is not completed before allowing editing
                if (!checkbox.checked) {
                    const newTaskText = prompt("Edit task:", label.textContent);
                    if (newTaskText !== null) {
                        label.textContent = newTaskText;
                    }
                }
            });
            taskitem.appendChild(editButton);

            
            
            //adding class to style
            taskitem.classList.add("task");
            //append taskitem to tasklist
            tasklist.appendChild(taskitem);
        //save to storage
        // chrome.storage.sync.get({tasks:[]},function (data){
            // const tasks=data.tasks;
            // tasks.push(tasktext);
            // chrome.storage.sync.set({tasks:tasks});
        // });
        //clear ip
        taskinput.value="";
        }
        

    });
    // Listen for changes in checkbox state and toggle the strikethrough
    tasklist.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const label = event.target.nextElementSibling;
            label.classList.toggle("completed");
        }
    // chrome.storage.sync.get({tasks:[]},function (data){
    //     const tasks=data.tasks;
    //     for(const task of tasks){
    //         const taskitem=document.createElement("li");
    //         taskitem.textContent=task;
    //         tasklist.appendChild(taskitem);      
    //      }
    });

});
