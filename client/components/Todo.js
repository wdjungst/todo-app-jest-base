import React from 'react';

const Todo = ({ _id, text, completed, onUpdate, onDelete }) => (
  <li 
    className="collection-item" 
    style={ completed ? 
      { cursor: 'pointer', textDecoration: 'line-through', color: 'grey' } : {cursor: 'pointer' }
    }
    onClick={ () => onUpdate(_id, !completed) }
  >
    <div>
      {text}
      <a
        className="secondary-content"
        onClick={ e => { 
          e.preventDefault()
          onDelete(_id) 
        }}
      >
        Delete
      </a>
    </div>
   </li>
)

export default Todo;
