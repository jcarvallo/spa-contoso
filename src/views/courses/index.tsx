import React, { FC, useState, useEffect } from "react";
import { ContosoModel } from "../../models/contoso.model";
import { Table, Button, Row, Col, Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { CourseServices } from ".././../services/index";
import { useStateValue } from "../../contexts/index";
import { navigate } from "@reach/router";
import DeleteCourse  from "../courses/component/DeleteCourse";

const services = new CourseServices();

const Courses: FC<ContosoModel> = () => {
  const initialState = {
    course: [],
    courseDelete: {},
    active: false
  };
  const [state, setState]: any = useState(initialState);
  const [context, dispatch]: any = useStateValue();

  useEffect(() => {
    try {
      services
        .getAll()
        .then(res => {
          setState((preState: any) => ({ ...preState, course: res }));
        })
        .catch(error => {
          console.log(error);
        });

      dispatch({ type: "changeHeader", title: "Course List" });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAction = (to: string, data?: any) => navigate(to, { state: data });

   const handleDelete = (data: any) => {
     setState((preState: any) => ({
       ...preState,
       active: !preState.active,
       courseDelete: {
         ID: data.ID,
         modalActive: () =>
           setState((preState: any) => ({
             ...preState,
             active: !preState.active
           })),
         Title: `Delete course ${data.Title}`
       }
     }));
   };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs={11}>
            <Table striped>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Capacity</th>
                  <th>Instructor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.course.length > 0 ? (
                  state.course.map((td: any, index: any) => (
                    <tr key={index}>
                      <th scope="row">{td.ID}</th>
                      <td>{td.Title}</td>
                      <td>{td.Department.Title}</td>
                      <td>{td.Capacity}</td>
                      <td>
                        <Button color="link" title="Detalle">
                          Detalle
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="link"
                          title="Edit course"
                          onClick={() => handleAction("/course/edit", td)}
                        >
                          Edit
                        </Button>
                        {""}
                        <Button
                          onClick={() => handleDelete(td)}
                          color="link"
                          title="Delete couse"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} align="center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs={1}>
            <Button
              className="btn-create"
              title="New Departament"
              onClick={() => handleAction("/course/create")}
            >
              <FontAwesomeIcon size="lg" icon={faPlusCircle} />
            </Button>
          </Col>
        </Row>
      </CardBody>
      <DeleteCourse active={state.active} courseDelete={state.courseDelete} />
    </Card>
  );
};

export default Courses;
