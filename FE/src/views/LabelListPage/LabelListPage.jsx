import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Button from "@Style/Button";

import Label from "@LabelListPage/Label/Label";
import LabelListHeader from "@LabelListPage/LabelListHeader/LabelListHeader";
import NavigationButton from "@NavigationButton/NavigationButton";
import CreateLabel from "@LabelListPage/CreateLabel/CreateLabel";
import Header from "@Header/Header";
import Table from "@Table/Table";
import { getLabel, createLabel, editLabel, deleteLabel } from "@Modules/label";

const LabelListPage = ({ getLabel, createLabel, editLabel, deleteLabel, labels, loadingLabel }) => {
  const [isOpenNewLabel, setIsOpenNewLabel] = useState(false);

  const newLabelOpenHandler = () => setIsOpenNewLabel(!isOpenNewLabel);

  const hasLabels = () => !loadingLabel && labels;

  const LabelList = () => (
    <>
      {!loadingLabel &&
        labels &&
        labels.map((label) => (
          <Label key={label.id.labelId} label={label} createHandler={createHandler} editHandler={editHandler} deleteHandler={deleteHandler} />
        ))}
    </>
  );

  const getLabelFc = async () => {
    try {
      await getLabel();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLabelFc();
  }, []);

  const createHandler = (params) => {
    const fn = async () => {
      try {
        await createLabel(params);
        getLabelFc();
      } catch (e) {
        console.error(e);
      }
    };
    fn();
  };

      }
    };
    fn();
  }, [getLabel]);

  return (
    <>
      <Header />
      <NavBarWrap>
        <NavBar>
          <NavigationButton isLabel />
          <Button onClick={newLabelOpenHandler}>New Label</Button>
        </NavBar>
      </NavBarWrap>
      {isOpenNewLabel && (
        <CreateLabel createHandler={createHandler} editHandler={editHandler} deleteHandler={deleteHandler} close={newLabelOpenHandler} />
      )}
      <Table tableHeader={<LabelListHeader count={hasLabels() && labels.length} />} tableList={<LabelList />} />
    </>
  );
};

const NavBarWrap = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const NavBar = styled.nav`
  width: 65%;
  max-width: 1000px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default connect(
  ({ label }) => ({
    labels: label.labels,
  }),
  {
    getLabel,
    createLabel,
    editLabel,
    deleteLabel,
  }
)(LabelListPage);
