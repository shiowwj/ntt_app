import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ViewFormsComponent from './ViewForms';
import CreateFormComponent from './CreateForm';
import EditFormComponent from './EditForm';

const DashBoardMainComponent: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ViewFormsComponent/>
        </Route>
        <Route path={`${path}/createform`}>
          <CreateFormComponent />
        </Route>
        <Route path={`${path}/editform/:formId`}>
          <EditFormComponent />
        </Route>
      </Switch>
    </>
  )
}

export default DashBoardMainComponent;