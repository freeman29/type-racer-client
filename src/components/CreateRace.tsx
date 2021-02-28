import { useMachine } from "@xstate/react";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
  Spinner,
  FormFeedback,
} from "reactstrap";
import { createRaceMachine } from "../states/createRaceMachine";
// import { socket } from "../config/socket-io";

const CreateRace = () => {
  const history = useHistory();
  const [current, send] = useMachine(createRaceMachine);
  return (
    <Container className="create-game-box">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">Create Race</h1>
          <Form>
            <FormGroup>
              <Label for="racerName">Enter Racer Name</Label>
              <Input
                type="text"
                name="racerName"
                id="racerName"
                placeholder="Sergio Perez"
                onChange={(e) =>
                  send({ type: "NAME_CHANGE", value: e.target.value })
                }
                invalid={current.matches("ready.racerName.error.empty")}
              />
              {current.matches("ready.racerName.error.empty") ? (
                <FormFeedback>Racer name is required!</FormFeedback>
              ) : null}
              <div className="btn-box">
                <Button color="secondary" onClick={() => history.push("/")}>
                  Cancel
                </Button>{" "}
                <Button
                  color="primary"
                  className="btn-create"
                  onClick={() => send("SUBMIT")}
                >
                  {current.matches("waitingResponse") ? (
                    <Spinner size="sm" color="light" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateRace;
