import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import CurrentMonthBody from "./CurrentMonthBody";
import CurrentMonthGroupBody from "./CurrentMonthGroupBody";
import CategoriesBody from "./CategoriesBody";
import GroupBody from "./GroupBody";
import CategoryBody from "./CategoryBody";
import PayeesBody from "./PayeesBody";
import PayeeBody from "./PayeeBody";
import IncomeVsExpensesBody from "./IncomeVsExpensesBody";
import NetWorthBody from "./NetWorthBody";
import ProjectionsBody from "./ProjectionsBody";
import SettingsBody from "./SettingsBody";

const routes = [
  {
    path: "/budgets/:budgetId",
    Component: CurrentMonthBody,
    props: props => ({
      budget: props.budget,
      currentMonth: props.currentMonth,
      investmentAccounts: props.investmentAccounts
    })
  },
  {
    path: "/budgets/:budgetId/current/:categoryGroupId",
    Component: CurrentMonthGroupBody,
    props: (props, params) => ({
      budget: props.budget,
      categoryGroupId: params.categoryGroupId,
      currentMonth: props.currentMonth
    })
  },
  {
    path: "/budgets/:budgetId/current/:categoryGroupId/:categoryId",
    Component: CurrentMonthGroupBody,
    props: (props, params) => ({
      budget: props.budget,
      categoryId: params.categoryId,
      categoryGroupId: params.categoryGroupId,
      currentMonth: props.currentMonth
    })
  },
  {
    path: "/budgets/:budgetId/categories",
    Component: CategoriesBody,
    props: props => ({
      budget: props.budget,
      sort: props.settings.categoriesSort
    })
  },
  {
    path: "/budgets/:budgetId/category-groups/:categoryGroupId",
    Component: GroupBody,
    props: (props, params) => ({
      budget: props.budget,
      categoryGroup: props.budget.categoryGroupsById[params.categoryGroupId]
    })
  },
  {
    path: "/budgets/:budgetId/category-groups/:categoryGroupId/:categoryId",
    Component: CategoryBody,
    props: (props, params) => ({
      budget: props.budget,
      category: props.budget.categoriesById[params.categoryId]
    })
  },
  {
    path: "/budgets/:budgetId/payees",
    Component: PayeesBody,
    props: props => ({
      budget: props.budget,
      sort: props.settings.payeesSort
    })
  },
  {
    path: "/budgets/:budgetId/payees/:payeeId",
    Component: PayeeBody,
    props: (props, params) => ({
      budget: props.budget,
      payee: props.budget.payeesById[params.payeeId]
    })
  },
  {
    path: "/budgets/:budgetId/income-vs-expenses",
    Component: IncomeVsExpensesBody,
    props: props => ({
      budget: props.budget,
      investmentAccounts: props.investmentAccounts,
      showing: props.settings.incomeVsExpensesShowing
    })
  },
  {
    path: "/budgets/:budgetId/net-worth",
    Component: NetWorthBody,
    props: props => ({
      budget: props.budget,
      investmentAccounts: props.investmentAccounts,
      mortgageAccounts: props.mortgageAccounts
    })
  },
  {
    path: "/budgets/:budgetId/projections",
    Component: ProjectionsBody,
    props: props => ({
      budget: props.budget,
      investmentAccounts: props.investmentAccounts,
      mortgageAccounts: props.mortgageAccounts
    })
  },
  {
    path: "/budgets/:budgetId/settings",
    Component: SettingsBody,
    props: props => ({
      budget: props.budget,
      investmentAccounts: props.investmentAccounts,
      mortgageAccounts: props.mortgageAccounts,
      onUpdateAccounts: props.onUpdateAccounts
    })
  }
];

const PageContent = props =>
  props.budget && (
    <Switch>
      {routes.map(({ path, props: propsFunction, Component }) => (
        <Route
          key={path}
          path={path}
          exact
          render={({ match }) => (
            <Component {...propsFunction(props, match.params)} />
          )}
        />
      ))}
    </Switch>
  );

PageContent.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  investmentAccounts: PropTypes.object.isRequired,
  mortgageAccounts: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onUpdateAccounts: PropTypes.func.isRequired,
  budget: PropTypes.object
};

export default PageContent;