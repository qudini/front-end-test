import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './Filter';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

describe('Filter Component', () => {
    it('renders the Filter component', () => {
        render(<Filter filterValue="" onFilterChange={() => {}} />);
        expect(screen.getByLabelText(/Filter/)).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Filter filterValue="" onFilterChange={() => {}} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('is accessible', async () => {
        const { container } = render(<Filter filterValue="" onFilterChange={() => {}} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('invokes onFilterChange callback on input change', async () => {
        const mockCallback = jest.fn();
        render(<Filter filterValue="" onFilterChange={mockCallback}/>);
        const input = screen.getByLabelText(/Filter/);

        await userEvent.type(input, 't');
        expect(mockCallback).toHaveBeenCalledWith('t');
    });
});
