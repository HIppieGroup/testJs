var todoList  = [], aplyList = [];
var inputTodo = document.getElementById("input-js");
var outToDo   = document.getElementById("toDoList");
var itemsLeft = document.getElementById("footer").querySelector('.footer__items-left');
var arrowDown = document.querySelector(".arrow-down");
var btnGroup  = document.querySelectorAll(".action-button__btn");
var value, editIMP, arrow;
inputTodo.focus();


function todo(text) {
  this.text = text
  this.aply = false
  this.show = true
} 

function load() {
  if (localStorage.ToDoList) {
    var sobj;
    var a = [];
    var list = localStorage.ToDoList.replace( /},{/g, "}/{" );
    list = list.split('/');
    for (var i = 0; i <= list.length -1; i++) {
      sobj = JSON.parse(list[i]);
      sobj.show = true;
      todoList.push(sobj);
    }
    renderAll(todoList);
    arrowDef();
  }
}
load();


function arrowDef() {
  var count = 0;
  for (var i = 0; i <= todoList.length -1; i++) {
   if(todoList[i].aply == true) {
    count += 1;
   }
  }
  if (count == todoList.length) {
    arrow = true;
   } else {
    arrow = false;
   }
}


function saveLocal(list) {
  var sobj;
  var a = [];
  for (var i = 0; i <= list.length -1; i++) {
    sobj = JSON.stringify(list[i]);
    a.push(sobj);
  }
  localStorage.setItem("ToDoList", a);
}

inputTodo.onkeydown = function (e) {
 e = e || inputTodo.event;
 if (e.keyCode === 13) {
  value = inputTodo.value;
  if (value) {
    todoList.push(new todo(value));

    if (outToDo.getAttribute("date-list") == "done-list"){
      showApply();
    } else {
      renderAll(todoList);
    }
    
    saveLocal(todoList);
    inputTodo.value = '';
  }   
  return false;     
}
}

function renderAll(list) {
  outToDo.innerHTML = '';
  var todoList = list;
  var itemsCount = 0;

  for (var i = 0; i <= todoList.length -1; i++) {
    var t = todoList[i];
    var element = document.createElement('li'); 
    if ( t.aply == false && t.show == true) {
      element.className = "out-list__item";
      element.innerHTML = "<a href='#' onclick='deleteSelect(event)' class='del-close' data-num="+ i +"></a><span class='out-list__content'>"+t.text+"</span><a href='#' onclick='deliteItem(event)' class='out-list__button' data-num="+ i +">Done</a>";
      outToDo.insertBefore(element, outToDo.firstChild);
    }else if( t.aply == true && t.show == true){
      element.className = "out-list__item out-list__item_done";
      element.innerHTML = "<a href='#' onclick='deleteSelect(event)' class='del-close' data-num="+ i +"></a><span class='out-list__content'>"+t.text+"</span>";
      outToDo.appendChild(element);
    }
    if (t.aply == false) {
      itemsCount += 1;
    }
  }
  itemsLeft.innerHTML = itemsCount;
  return false;
}



outToDo.ondblclick = function(event) {
  var target = event.target; 

  if (target.tagName == 'LI' && target.className == 'out-list__item' ) {
    editItem(target);
  }

  if (target.tagName != 'LI') {
    if (target.tagName == 'SPAN' && target.parentNode.className == 'out-list__item') {
      target = target.parentNode;
      editItem(target);
    }
  }
  return;
}


function editItem(target) {  

  var contentEl   = target.querySelector('.out-list__content');
  var doneButton  = target.querySelector('.out-list__button');
  var closeButton = target.querySelector('.del-close');
  var content     = contentEl.innerHTML;
  var dateNum     = doneButton.getAttribute('data-num');

  contentEl.style.display   = "none";
  doneButton.style.display  = "none";
  closeButton.style.display = "none";

  var editELement       = document.createElement('input');
  editELement.className = "edit-imp";
  editELement.id        = "edit-IMP";
  editELement.value     = content;
  target.appendChild(editELement);


  editIMP = document.getElementById('edit-IMP');
  editIMP.focus();
  editIMP.onkeydown = function (e) {
   e = e || editIMP.event;
   if (e.keyCode === 13) {

    value = editIMP.value;
    if (value) {

      todoList[dateNum].text = value;
      renderAll(todoList);
      saveLocal(todoList);

    }   
    return false;     
  }
};

editIMP.onblur = function() {
  renderAll(todoList);
  return;

};

}

function removeActive() {
  btnGroup.forEach((element)=>{
    element.classList.remove("active_btn");
  })
}

function showAll(event) {

  var event = event ? event.target : btnGroup[0];
  removeActive();
  event.classList.add("active_btn");
  

  outToDo.setAttribute("date-list", "all-list")
  for (var i = 0; i <= todoList.length -1; i++) {
      todoList[i].show = true;
    }
  renderAll(todoList);
}

function deleteSelect(event) {
  var item = event.target;
  var attr = item.getAttribute("data-num");
  var parent = item.parentNode.remove();

  todoList.splice(attr,1);

  renderAll(todoList);
  saveLocal(todoList);
  return false;
}


function deliteItem(event) {
  var item = event.target;
  var attr = item.getAttribute("data-num");
  var parent = item.parentNode.remove();
  todoList[attr].aply = true;

  if (outToDo.getAttribute("date-list") == "active-list") {
    noApply();
  }else {
    renderAll(todoList);
  }
  saveLocal(todoList);
  return false;
}

function showApply(event) {

  var event = event ? event.target : btnGroup[1];
  removeActive();
  event.classList.add("active_btn");

  outToDo.setAttribute("date-list", "done-list"); 

  var list =[];
  for (var i = 0; i <= todoList.length -1; i++) {
    if (todoList[i].aply == false) {
      todoList[i].show = false;
    }else {
      todoList[i].show = true;
    }
  }
  renderAll(todoList);
}

function noApply(event) {
  var event = event ? event.target : btnGroup[2];
  removeActive();
  event.classList.add("active_btn");

  outToDo.setAttribute("date-list", "active-list");
  var list =[];
  for (var i = 0; i <= todoList.length -1; i++) {
    if (todoList[i].aply == true) {
      todoList[i].show = false;
    }else {
      todoList[i].show = true;
    }
  }
  renderAll(todoList);
}

function deleteDone() {
  for (var i = todoList.length - 1; i >= 0; i--) {
    if (todoList[i].aply == true) {
      todoList.splice(i,1);
    }
  }
  renderAll(todoList);
  saveLocal(todoList);
  return false;
}



arrowDown.onclick = function (event) {

  if (arrow == false) {
    for (var i = 0; i <= todoList.length -1; i++) {
      todoList[i].aply = true;
    }
    arrow = true;
  } else {
    for (var i = 0; i <= todoList.length -1; i++) {
      todoList[i].aply = false;
    }
    arrow = false;
  }
  saveLocal(todoList);
  if (outToDo.getAttribute("date-list") == "done-list"){
    showApply();
  } else if(outToDo.getAttribute("date-list") == "active-list"){
    noApply();
  } else {
    renderAll(todoList);
  }

}