// components/Filter.js
import React from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  padding-bottom: 10px;
  width: 342px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: darkslategrey;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Filter = ({ filterValue, onFilterChange }) => {
    return (
        <FilterWrapper>
            <FilterLabel htmlFor="filterInput">Filter</FilterLabel>
            <FilterInput
                type="text"
                id="filterInput"
                placeholder="Filter by name"
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
            />
        </FilterWrapper>
    );
};

export default Filter;
