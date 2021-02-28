import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Jumbotron } from "reactstrap";

const RaceMenu = () => {
  const history = useHistory();

  return (
    <div className="menu-box">
      <div className="vertical-center">
        <Container className="themed-container">
          <Jumbotron>
            <div className="text-center">
              <h1>Welcome to Type Racer</h1>
              <Button
                color="primary"
                onClick={() => history.push("/race/create")}
              >
                Create Game
              </Button>{" "}
              <Button
                color="primary"
                onClick={() => history.push("/race/join")}
              >
                Join Game
              </Button>
            </div>
          </Jumbotron>
        </Container>
      </div>
    </div>
  );
};

export default RaceMenu;
