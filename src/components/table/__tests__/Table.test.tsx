import React from "react";
import TableComponent from "../TableComponent";
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
configure({adapter: new Adapter()});


describe("<TableComponent />", () => {
  const wrapper = shallow(
    <Provider store={store}>
       <TableComponent />
    </Provider>
 );
test('renders without error',async ()=>{
    const tableComponent = wrapper.find(`[data-testId="table-component"]`);
    expect(tableComponent.length).toBe(1);
});
});