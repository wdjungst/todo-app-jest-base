import React from 'react';

const TodoForm = ({ onAdd }) => {
  let input;
  return (
    <form 
      className="center"
      onSubmit={ (e) => {
        e.preventDefault();
        onAdd(input.value);
        input.value = null;
      }}
    >
      <input ref={ n => input = n } />
    </form>
  )
}

export default TodoForm;
