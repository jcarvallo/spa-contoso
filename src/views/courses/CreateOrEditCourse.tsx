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

const servicesDepart = new DepartamentServices();

const CreateOrEditCourse: FC<ContosoModel> = ({ ...res }) => {
  const initialState = {
    ID: "",
    Title: "",
    Capacity: 0,
    DepartmentID:''
  };
  const [state, setState] = useState(initialState);
  const [context, dispatch]: any = useStateValue();
  const [department,setDepartment]=useState([])
  const { action, location } = res;

  const title =
    action === "create"
      ? "New course"
      : `Edit course ${location.state.title}`;

  useEffect(() => {
    
    try {
      servicesDepart
        .getAll()
        .then((res:any) => {

          if (action === "edit") {
            let data = location.state;

            setState((preState: any) => ({
              ...preState,
              ID: data.ID,
              Title: data.Title,
              Capacity: data.Capacity
            }));
          
          let departments: any = [];
          for (const i of res) {
              let model:any = { ID: i.ID, Title: i.Title, selected:false};
              if (i.ID===data.Department.ID){
                  model.selected=true
                  setState((pre: any) => ({
                    ...pre,
                    DepartmentID: i.ID
                  }));
              } 
              departments.push(model);
          }
          setDepartment(departments);

          }else{
            
             setDepartment(res);
          }
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
   

    dispatch({ type: "changeHeader", title: title, back: true });
  }, [dispatch, action, setState, location.state, title]);

  const handelChange = ({ target }: any) => {
    let { name, value } = target;
    setState(preState => ({ ...preState, [name]: value }));
  };

  const handelSubmit = () => {
    alert(JSON.stringify(state));
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
                value={state.Title}
                onChange={handelChange}
                name="Title"
                id="title"
                placeholder="Title course"
              />
            </FormGroup>
            <FormGroup>
              <Label for="DepartmentID">Departament</Label>
              <Input
                type="select"
                name="DepartmentID"
                id="DepartmentID"
                onChange={handelChange}
                value={state.DepartmentID}
              >
                <option value={0}>Select department</option>
                {department.map((depart: any) => (
                  <option value={depart.ID} selected={depart.selected}>
                    {depart.Title}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="capacityID">Capacity</Label>
              <Input
                type="number"
                value={state.Capacity}
                name="Capacity"
                onChange={handelChange}
                min="0"
                max="30"
                id="capacityID"
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

export default CreateOrEditCourse;
