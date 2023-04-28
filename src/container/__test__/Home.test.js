import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Home';

test('Test the Home page', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});

