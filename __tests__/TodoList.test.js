import React from 'react';
import TodoList from '../client/components/TodoList';
import renderer from 'react-test-renderer';
import { spy, fakeServer } from 'sinon';
import { mount, shallow } from 'enzyme';

describe('<TodoList />', () => {
  test('Component is rendered', () => {
    const component = renderer.create(
      <TodoList />
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls componentDidMount() lifecycle method', () => {
    const componentDidMountSpy = spy(TodoList.prototype, 'componentDidMount');
    const component = mount(<TodoList />);
    expect(TodoList.prototype.componentDidMount.calledOnce);
    componentDidMountSpy.restore();
   });

  it('updates state on add', () => {
    const component = mount(<TodoList />);
    const server = fakeServer.create();
    server.respondWith('POST', '/api/todos', [
      200,
      {
        'Content-Type': 'application/json',
        'Content-Length': 2
      },
      '{ "text": "Buy Milk", "completed": false, "_id": 1 }'
    ]);
    component.instance().onAdd('foo') 
    server.respond();
    component.update();
    expect(component.state('todos').length).toBe(1);
    server.restore();
  });

  describe('update and delete', () => {
    let todos;
    let component;
    let server;

    beforeEach(() => {
      todos = [{ _id: 1, text: 'buy milk', completed: false }]
      component = mount(<TodoList />);
      server = fakeServer.create();
    });

    afterEach(() => {
      server.restore();
    });

    it('onUpdate updates state', () => {
      server.respondWith('PUT', '/api/todos/1', [
        200,
        {
          'Content-Type': 'application/json',
          'Content-Length': 2
        },
        '{ "text": "Buy Milk", "completed": true, "_id": 1 }'
      ]);
      component.setState({ todos });
      expect(component.state('todos')[0].completed).toBe(false);
      component.instance().onUpdate(1, true) 
      server.respond();
      component.update();
      expect(component.state('todos')[0].completed).toBe(true);
    });

    it('onDelete updates state', () => {
      server.respondWith('DELETE', '/api/todos/1', [
        200,
        {
          'Content-Type': 'application/json',
          'Content-Length': 2
        },
        '{ "text": "Buy Milk", "completed": true, "_id": 1 }'
      ]);
      component.setState({ todos });
      expect(component.state('todos').length).toBe(1)
      component.instance().onDelete(1) 
      server.respond();
      component.update();
      expect(component.state('todos').length).toBe(0)
    });
  });
});
