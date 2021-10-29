import React from 'react';
import { SpacexList } from '../SpacexList';
import Enzyme,{configure,shallow,mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { store } from '../../../../spax/src/state/store';

Enzyme.configure({ adapter: new Adapter() });

// const setup = () => {

//     return mount(<Provider store={store}><SpacexList /></Provider>);
//   }
  

describe("<SpacexList />",()=>{
    // let wrapper:any;
    // beforeEach(() => {
    //   wrapper = setup();
    // })
    const wrapper = shallow(
        <Provider store={store}>
            <SpacexList />
        </Provider>
    )
    test('renders without error',async ()=>{
        const speaxComponent = wrapper.find("[data-test='component']");
        expect(speaxComponent.length).toBe(1);
    });
    test('DateRange is render propperly',()=>{
        // console.log(wrapper.debug());
        const dataRangeExist = wrapper.find("DateRange").exists();
        expect(dataRangeExist).toBe(true);
    });
});