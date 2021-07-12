<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>Week12 Todo List</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./normalize.css">
</head>

<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <h1 class="text-center">Todo List</h1>
        <div class="input-group mb-3">
          <input type="text" class="input-todo form-control" placeholder="todo">
          <div class="input-group-append">
            <button class="btn btn-add btn-outline-secondary" type="button">新增</button>
          </div>
        </div>
        <div class="todos list-group">
        </div>
        <div class="info mt-1 d-flex justify-content-between align-items-center">
          <div><span class="uncomplete-count">0</span>個未完成</div>
          <div class="options d-flex">
            <div class="active" data-filter="all">全部</div>
            <div class="ml-2" data-filter="uncomplete">未完成</div>
            <div class="ml-2" data-filter="done">已完成</div>
          </div>
          <div class="clear-all">
            移除已完成待辦事項
          </div>
        </div>
        <button type="button" class="btn btn-save btn-primary">儲存</button>

      </div>
    </div>
  </div>
  <script>
    let id = 1
    let todos = []
    let todoCount = 0
    let uncompleteCount = 0

    const todoBlock =`<div class="todo list-group-item list-group-item-action justify-content-between align-items-center {todoClass}">
        <div class="todo__content-wrapper custom-control custom-checkbox">
          <input type="checkbox" class="check-todo custom-control-input" id="todo-{id}">
          <label class="todo__content custom-control-label" for="todo-{id}">{content}</label>
        </div>
        <button type="button" class="btn-delete btn btn-danger">刪除</button>
      </div>`

    const searchParams = new URLSearchParams(window.location.search)
    const todoId = searchParams.get('id')
    if (todoId) {
      $.getJSON(
        'http://mentor-program.co/mtr04group5/milu/Week12-ToDoList/get_todo.php?id=' + todoId, (data) => {
          todos = JSON.parse(data.data.todo)
          render()
        });
    }

    $('.btn-add').click(() => {
      addTodo()
    })

    $('.input-todo').keydown((e) => {
      if (e.key === 'Enter') {
        addTodo()
      }
    })

    $('.todos').on('click', '.btn-delete', (e) => {
      const deleteId = $(e.target).parent().find('.check-todo').attr('id').replace('todo-', '')
      todos = todos.filter(todo => {
        return todo.id !== Number(deleteId)
      })
      render()
    })

    $('.todos').on('change', '.check-todo', (e) => {
      const updateId = $(e.target).attr('id').replace('todo-', '')
      const isChecked = $(e.target).is(':checked')
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === Number(updateId)) {
          todos[i].isDone = isChecked
        }
      }
      render()
    })

    $('.clear-all').click(() => {
      todos = todos.filter(todo => !todo.isDone)
      render()
    })

    $('.options').on('click', 'div', (e) => {
      const target = $(e.target)
      const filter = target.attr('data-filter')
      $('.options div.active').removeClass('active')
      target.addClass('active')

      if (filter === 'all') {
        $('.todo').show()
      } else if (filter === 'uncomplete') {
        $('.todo').show()
        $('.todo.checked').hide()
      } else {
        $('.todo').hide()
        $('.todo.checked').show()
      }
    })

    $('.btn-save').click(() => {
      const data = JSON.stringify(todos)
      $.ajax({
        type: 'POST',
        url: 'http://mentor-program.co/mtr04group5/milu/Week12-ToDoList/add_todo.php',
        data: {
          todo: data
        },
        success: (response) => {
          const responseId = response.id
          window.location = 'index.php?id=' + responseId
        },
        error: () => {
          alert('Error')
        }
      })
    })

    function updateUncomplete() {
      $('.uncomplete-count').text(uncompleteCount)
    }

    function addTodo() {
      const value = $('.input-todo').val()
      if (!value) return
      todos.push({
        id: id,
        content: value,
        isDone: false
      })
      render()
      $('.input-todo').val('')
    }

    function render() {
      $('.todos').empty()
      if (todos.length !== 0) {
        id = todos[todos.length - 1].id + 1
      }
      todoCount = todos.length
      uncompleteCount = todos.filter(todo => !todo.isDone).length

      for(let i = 0; i < todos.length; i++) {
        const todo = todos[i]
        $('.todos').append(todoBlock
            .replace('{content}', escapeHTML(todo.content))
            .replaceAll('{id}', todo.id)
            .replaceAll('{todoClass}', todo.isDone ? 'checked' : '')
          )
        if (todo.isDone) {
          $('#todo-' + todo.id).prop('checked', true)
        }
      }
      updateUncomplete()
    }

    function escapeHTML(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  </script>
</body>
</html>
