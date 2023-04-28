import { screen } from '@testing-library/react';
import { shallow } from "enzyme";
import { AllBooks } from '../AllBooks';

test('the Home page', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn("useState");
    useStateSpy.mockImplementation((initialState) => [initialState, setState]);
    const wrapper = shallow(<AllBooks />);
    const countValue = screen.getByText()
    expect(countValue.textContent).toBe("0");

});
