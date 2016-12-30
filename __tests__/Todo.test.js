import React from 'react';
import Todo from '../client/components/Todo';
import renderer from 'react-test-renderer';

describe('Todo', () => {
  test('Component is rendered', () => {
    const onUpdate = (id, completed) => {
      return null
    }
  
    const onDelete = (id) => {
      return null
    }
  
    const component = renderer.create(
      <Todo onDelete={onDelete} onUpdate={onUpdate} _id={1} text="Buy Milk" completed={false} />
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('Component is rendered with completed style', () => {
    const component = renderer.create(
      <Todo _id={1} text="Buy Milk" completed={true} />
    )
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
