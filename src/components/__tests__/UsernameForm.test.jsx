import React from 'react';
import { render, queryByAttribute, screen, fireEvent } from '@testing-library/react';
import UsernameForm from '../UsernameForm';

const getById = queryByAttribute.bind(null, 'id');
describe('<UsernameForm />', () => {

    const props = {
        query: 'Kabutore',
        setQuery: jest.fn(), 
        fetchDetails: jest.fn(), 
    };  

    it('should find the username input', async () => {
        const dom = render(<UsernameForm {...props} />);
        const inputEl = getById(dom.container, 'username');
        await fireEvent.change(inputEl, {target: { value: 'Kabutore' }});
        expect(inputEl).toBeTruthy();
    });

    it('should be able to fetch and save the user', async () => {
        render(<UsernameForm {...props} />);
        await fireEvent.submit(screen.getByRole("button", { name: /Fetch User Profile/i }));
        expect(screen.getByText(/Fetch User Profile/i)).toBeInTheDocument();
    });
});
