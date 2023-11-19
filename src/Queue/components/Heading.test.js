import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';
import {axe} from "jest-axe";

describe('Heading Component', () => {
    it('renders with default styles', () => {
        render(<Heading>Test Heading</Heading>);

        const headingElement = screen.getByText('Test Heading');

        // Check if the heading is rendered
        expect(headingElement).toBeInTheDocument();

        // Check styles using jest-styled-components
        expect(headingElement).toHaveStyleRule('font-weight', 'bold');
        expect(headingElement).toHaveStyleRule('margin-bottom', '10px');
        expect(headingElement).toHaveStyleRule('color', 'darkslategrey');
    });

    it('renders different heading levels', () => {
        render(
            <>
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
            </>
        );

        // Check if each heading level is rendered
        expect(screen.getByText('Heading 1').tagName).toBe('H1');
        expect(screen.getByText('Heading 2').tagName).toBe('H2');
        expect(screen.getByText('Heading 3').tagName).toBe('H3');
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Heading>Snapshot Test</Heading>);

        // Check if the component matches the snapshot
        expect(asFragment()).toMatchSnapshot();
    });

    it('is accessible', async () => {
        const {container} = render(<Heading>Heading</Heading>);

        const results = await axe(container);

        // Expect no violations
        expect(results).toHaveNoViolations();
    });
});
