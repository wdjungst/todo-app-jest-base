import React from 'react';
import TodoForm from '../client/components/TodoForm';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('<TodoForm />', () => {
  test('Component is rendered', () => {
    const component = renderer.create(
      <TodoForm />
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Submit works', () => {
    let test = { onAdd: jest.fn() }
    const component = mount(
      <TodoForm onAdd={test.onAdd} />
    )

    component.find('form').simulate('submit')
    expect(component.find('input').text()).toBe('')
    expect(test.onAdd).toHaveBeenCalledTimes(1);
  });
});
