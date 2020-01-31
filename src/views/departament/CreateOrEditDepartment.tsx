import React, { FC, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { ContosoModel } from "../../models/contoso.model";
import { useStateValue } from "../../contexts/index";
import { DepartamentServices } from "../../services/index";
import { navigate } from "@reach/router";

const services = new DepartamentServices();

const CreateOrEditDepartment: FC<ContosoModel> = ({ ...res }) => {
  const initialState = {
    id: "",
    name: "",
    description: ""
  };
  const [state, setState] = useState(initialState);
  const [context, dispatch]: any = useStateValue();
  const { action, location } = res;

  console.log(location);

  const title =
    action === "create"
      ? "New departament"
      : `Edit departament ${location.state.name}`;

  useEffect(() => {
    if (action === "edit") {
      let data = location.state;
      setState((preState: any) => ({
        ...preState,
        id: data.id,
        name: data.name,
        description: data.description
      }));
    }
    dispatch({ type: "changeHeader", title: title, back: true });
  }, [dispatch, action, setState, location.state, title]);

  const handelChange = ({ target }: any) => {
    let { name, value } = target;
    setState(preState => ({ ...preState, [name]: value }));
  };

  const handelSubmit = () => {
    try {
      if (action === "create") {
        services
          .create({ name: state.name, description: state.description })
          .then(res => {
              if(res.data==='OK') 
                navigate("/departament")
            })
          .catch(error => console.log(error));
         
      } else {
        services
          .update(
            { name: state.name, description: state.description },
            parseInt(state.id)
          )
          .then(res => {
            if (res.data === "OK") navigate("/departament");
          })
          .catch(error => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => setState(initialState);

  return (
    <Card body>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                value={state.name}
                onChange={e => handelChange(e)}
                name="name"
                id="title"
                placeholder="Title departament"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input
                type="textarea"
                value={state.description}
                onChange={e => handelChange(e)}
                name="description"
                id="description"
              />
            </FormGroup>
            <Row className="text-center">
              <Col xs={action === "create" ? 6 : 12}>
                <Button onClick={() => handelSubmit()} block>
                  {action === "create" ? "Save" : "Edit"}
                </Button>{" "}
              </Col>
              {action === "create" && (
                <Col xs={6}>
                  <Button onClick={() => clear()} block>
                    Clear
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default CreateOrEditDepartment;
