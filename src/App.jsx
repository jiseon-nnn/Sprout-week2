import { useState } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);

  return (
    <div>
      <p>Todo-List</p>
      <TodoInput list={list} setList={setList} />
      <TodoList list={list} setList={setList} />
    </div>
  );
}


// TodoInput 컴포넌트
function TodoInput({ list, setList }) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    const newTodo = {
      id: Number(new Date()),
      value: inputValue
    }
    setList([...list, newTodo])
    setInputValue('')
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>할일 추가</button>
    </div>
  )
}

// TodoList 컴포넌트
function TodoList({ list, setList }) {
  return (
    <ul className='todoList'>
      {list.map((item) => (
        <Todo key={item.id} item={item} setList={setList} />
      ))}
    </ul>
  )
}


// Todo 컴포넌트
function Todo({ item, setList }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(item.value)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleUpdate = () => {
    setList((prev) =>
      prev.map((el) => (el.id === item.id ? { ...el, value: editValue } : el))
    )
    setIsEditing(false)
  }

  const handleDelete = () => {
    setList((prev) => prev.filter((el) => el.id !== item.id))
  }

  return (
    <li className='todoInput'>
      <input type="checkbox" />
      {isEditing ? (
      <>
        <input  
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          />
        <button onClick={handleUpdate}>완료</button>
        </>) : (
        <>
          {item.value}
          <button onClick={handleEdit}>수정</button>
        </>
      )}
      <button onClick={handleDelete}>삭제</button>
    </li>
  )
}



export default App