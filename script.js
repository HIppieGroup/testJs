var todoList= [], aplyList = [];
    var inputTodo = document.getElementById("input-js");
    var outToDo = document.getElementById("toDoList");
    var value;

    function todo(text) {
      this.text = text
      this.aply = false
    } 

    function load() {
      if (localStorage.ToDoList) {
        var sobj;
        var a = [];
        var list = localStorage.ToDoList.replace( /},{/g, "}/{" );
        list = list.split('/');
        for (var i = 0; i <= list.length -1; i++) {
          sobj = JSON.parse(list[i]);
          todoList.push(sobj);
        }
      renderAll(todoList);
      }
    }
    load();

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
              renderAll(todoList)
              saveLocal(todoList);
              inputTodo.value = '';
            }   
            return false;     
        }
    }

    function renderAll(list) {
      outToDo.innerHTML = '';
      var todoList = list;

      for (var i = 0; i <= todoList.length -1; i++) {
          var t = todoList[i];
         var element = document.createElement('li'); 
          if ( t.aply == false) {
            element.className = "out-list__item";
            element.innerHTML = "<span class='out-list__content'>"+t.text+"</span><a href='#' onclick='deliteItem(event)' class='out-list__button' data-num="+ i +">Done</a>";
            outToDo.insertBefore(element, outToDo.firstChild);
          }else{
            element.className = "out-list__item out-list__item_done";
            element.innerHTML = "<span class='out-list__content'>"+t.text+"</span>";
            outToDo.appendChild(element);
        }  
      }
    }

    function deliteItem(event) {
      var item = event.target;
      var attr = item.getAttribute("data-num");
      var parent = item.parentNode.remove();
      todoList[attr].aply = true;
      renderAll(todoList)
      saveLocal(todoList);
      return false;
    }

    function showApply() {
      var list =[];
      for (var i = 0; i <= todoList.length -1; i++) {
        if (todoList[i].aply == true) {
          list.push(todoList[i]);
          renderAll(list);
        }
      }
    }

    function noApply() {
      var list =[];
      for (var i = 0; i <= todoList.length -1; i++) {
        if (todoList[i].aply == false) {
          list.push(todoList[i]);
          renderAll(list);
        }
      }
    }

    function deleteDone() {
      console.log(todoList);
      for (var i = todoList.length - 1; i >= 0; i--) {
        if (todoList[i].aply == true) {
          todoList.splice(i,1);
        }
      }
      renderAll(todoList);
      saveLocal(todoList);
    }