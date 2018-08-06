import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import pages from "../pages";
import Icon from "./Icon";
import { plotBandColor, iconWidth } from "../styleVariables";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 60px;
`;

const IconWrapper = styled.div`
  width: ${iconWidth}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-top: 1px solid #eee;
  &:last-of-type {
    border-bottom: 1px solid #eee;
  }
`;

const SidebarMenuContent = ({ budgetId, onCloseSidebar, open }) => (
  <Fragment>
    <Header>
      <IconWrapper onClick={onCloseSidebar}>
        <Icon icon="times" />
      </IconWrapper>
      <Link
        to={`/budgets/${budgetId}/settings`}
        style={{ display: "flex" }}
        onClick={evt => {
          if (!open) {
            evt.preventDefault();
            return;
          }
          onCloseSidebar();
        }}
      >
        <IconWrapper>
          <Icon icon="cog" />
        </IconWrapper>
      </Link>
    </Header>
    {[
      "currentMonth",
      "categories",
      "payees",
      "incomeVsExpenses",
      "netWorth",
      "projections"
    ].map(page => {
      const { path, title, linkFunction } = pages[page];
      return (
        <StyledLink
          key={path}
          to={linkFunction({ budgetId })}
          activeStyle={{
            backgroundColor: plotBandColor
          }}
          exact
          onClick={evt => {
            if (!open) {
              evt.preventDefault();
              return;
            }
            onCloseSidebar();
          }}
        >
          {title}
        </StyledLink>
      );
    })}
  </Fragment>
);

SidebarMenuContent.propTypes = {
  budgetId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseSidebar: PropTypes.func.isRequired
};

export default SidebarMenuContent;
