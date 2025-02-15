import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {

  // todos is an array of todo headings initialized with an empty array [], 
  // indicating that there are no todo lists initially.
  const [todos, setTodos] = useState([]);
  // headingInput represents the value entered by user into an input field 
  // for adding a new heading for a todo item.
  const [headingInput, setHeadingInput] = useState('');
  // listInputs: Initialize listInputs as an empty object {}.
  //  This state will hold the value of input fields for each todo item individually.
  const [listInputs, setListInputs] = useState({});

  // handleAddTodo function is responsible for adding a new todo item to the todos array.
  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      // Add a new todo item to the todos array with the heading and an empty lists array.
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      // Clear the heading input field after adding the todo item.
      setHeadingInput('');
    }
  };

  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };

  // handleAddList function is responsible for adding a new list item to a 
  // specific todo item of a heading.
  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== '') {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: '' });
    }
  };

  // Remove a heading from the todos array.
  // index is the index of the heading to be removed.
  // Note that the function "knows" it is receiving an index 
  // because it is called within a closure that has access to the index variable.
  // THERE IS A LOT OF JAVASCRIPT MAGIC HAPPENING HERE.
  // This is a common pattern in React. A most clear approach is to pass 
  // index as an argument to the function explicitly.
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            // This input field is controlled by the headingInput state
            value={headingInput}
            // Update the headingInput state when the user types in the input field.
            // e is the event object, and e.target.value is the current value of the input field.
            // it es called every time the user types in the input field.
            onChange={(e) => setHeadingInput(e.target.value)}
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {/* Go thru the todos header array and render each todo header in a card. */}
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3> {/* Display the heading here */}
              {/* // index is passed to the handleDeleteTodo function so that it knows which heading to remove.
              // note that it is not passed explicitly to the function, but rather implicitly through the closure. */}
              <button className="delete-button-heading" onClick={handleDeleteTodo}>Delete Heading</button>
            </div>
            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className='todo_inside_list'>
                  <p>{list}</p>
                </li>
              ))}
            </ul>
            <div className='add_list'>
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}
                // Called with each keypress in the input field.
                onChange={(e) => handleListInputChange(index, e.target.value)} />
              <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
