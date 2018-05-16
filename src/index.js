import React from "react";
import ReactDOM from "react-dom";
import { Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div>
      <Header as="h1" content="Test BoilerPlate" />
      <Icon name="home" size="settings" />
    </div>
  );
};

const el = document.getElementById("root");

ReactDOM.render(<App />, el);
