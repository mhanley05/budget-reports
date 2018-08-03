import React from "react";
import PropTypes from "prop-types";
import compose from "lodash/fp/compose";
import groupBy from "lodash/fp/groupBy";
import map from "lodash/fp/map";
import sortBy from "lodash/fp/sortBy";
import sumBy from "lodash/fp/sumBy";
import styled from "styled-components";
import { selectedPlotBandColor } from "../styleVariables";
import Section from "./Section";
import { SecondaryText } from "./typeComponents";
import ListItem from "./ListItem";
import Amount from "./Amount";
import LabelWithTransactionCount from "./LabelWithTransactionCount";

const mapWithKeys = map.convert({ cap: false });

const StyledListItem = styled(ListItem)`
  background-color: ${props => props.selected && selectedPlotBandColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  margin-left: -10px;
  margin-right: -10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 2px;
  border-top: 0 !important;

  .collapsed & {
    background-color: transparent;
  }
`;

const CategoryBreakdown = ({
  budgetId,
  categoriesById,
  selectedCategoryId,
  transactions,
  onSelectCategory
}) => {
  const categoriesWithData = compose([
    sortBy("amount"),
    mapWithKeys((transactions, categoryId) => ({
      category: categoriesById[categoryId],
      count: transactions.length,
      amount: sumBy("amount")(transactions)
    })),
    groupBy("categoryId")
  ])(transactions);

  return (
    <Section title="Filter by Category" top>
      {categoriesWithData.map(({ category, count, amount }) => (
        <StyledListItem
          key={category.id}
          selected={category.id === selectedCategoryId}
          onClick={() => {
            onSelectCategory(category.id);
          }}
        >
          <SecondaryText>
            <LabelWithTransactionCount label={category.name} count={count} />
          </SecondaryText>
          <SecondaryText>
            <Amount amount={amount} />
          </SecondaryText>
        </StyledListItem>
      ))}
    </Section>
  );
};

CategoryBreakdown.propTypes = {
  budgetId: PropTypes.string.isRequired,
  categoriesById: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  transactions: PropTypes.array.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  selectedCategoryId: PropTypes.string
};

export default CategoryBreakdown;
