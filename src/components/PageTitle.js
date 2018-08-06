import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    path: "/budgets/:budgetId",
    title: "Current Month Spending"
  },
  {
    path: "/budgets/:budgetId/current/:categoryGroupId",
    title: (params, budget) =>
      budget.categoryGroupsById[params.categoryGroupId].name
  },
  {
    path: "/budgets/:budgetId/current/:categoryGroupId/:categoryId",
    title: (params, budget) => budget.categoriesById[params.categoryId].name
  },
  {
    path: "/budgets/:budgetId/categories",
    title: "Categories"
  },
  {
    path: "/budgets/:budgetId/category-groups/:categoryGroupId",
    title: (params, budget) =>
      budget.categoryGroupsById[params.categoryGroupId].name
  },
  {
    path: "/budgets/:budgetId/category-groups/:categoryGroupId/:categoryId",
    title: (params, budget) => budget.categoriesById[params.categoryId].name
  },
  {
    path: "/budgets/:budgetId/payees",
    title: "Payees"
  },
  {
    path: "/budgets/:budgetId/payees/:payeeId",
    title: (params, budget) => budget.payeesById[params.payeeId].name
  },
  {
    path: "/budgets/:budgetId/income-vs-expenses",
    title: "Income vs Expenses"
  },
  { path: "/budgets/:budgetId/net-worth", title: "Net Worth" },
  { path: "/budgets/:budgetId/projections", title: "Retirement Calculator" },
  { path: "/budgets/:budgetId/settings", title: "Budget Settings" }
];

const PageTitle = ({ budget }) =>
  budget && (
    <Switch>
      {routes.map(({ path, title }) => (
        <Route
          key={path}
          path={path}
          exact
          render={props =>
            typeof title === "function"
              ? title(props.match.params, budget)
              : title
          }
        />
      ))}
    </Switch>
  );

PageTitle.propTypes = {
  budget: PropTypes.object
};

export default PageTitle;