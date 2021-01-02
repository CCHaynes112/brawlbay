import React from "react";
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlayerCard from './PlayerCard';

Enzyme.configure({ adapter: new Adapter() });


describe('<PlayerCard />', () => {
    let shallow;

    beforeAll(() => {
        shallow = createShallow();
    });

    it('should work', () => {
        const wrapper = shallow(<PlayerCard />);
    });

    it('renders playerName prop', () => {
        let id = 0;
        let img = null;//require(`./assets/img/legend_art/3.png`);
        let rating = 50;
        let name = "testName";
        let region = "testRegion";
        let wins = 100;

        const mount = createMount();
        const wrapper = mount(
            <PlayerCard

            />
        );
        //expect(wrapper.find('Typography').text()).toEqual(name);
    });

    it('does not error on no image', () => {
        let img = null;

        const mount = createMount();
        const wrapper = mount(
            <PlayerCard
                legendImg={img}
            />
        );
        //check if the component rendered or something
    });

});






// let id = 0;
// let img = require(`./assets/img/legend_art/3.png`);
// let rating = 50;
// let name = "testName";
// let region = "testRegion";
// let wins = 100;

{/* 
<PlayerCard
    playerID={id}
    legendImg={img}
    playerRating={rating}
    playerName={name}
    playerRegion={region}
    playerWins={wins}
/> 
*/}

//props.playerID
//props.legendImg
//props.playerRating
//props.playerName
//props.playerRegion
//props.playerWins