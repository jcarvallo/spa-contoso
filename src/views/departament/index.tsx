import React, { FC, useState, useEffect } from 'react'
import { DepartamentServices } from '../../services/index';
import { navigate } from '@reach/router'
import { useStateValue } from '../../contexts/index'
import { Table, Button, Row, Col, Card, CardBody } from 'reactstrap'
import { ContosoModel } from '../../models/contoso.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteDepartment from './components/DeleteDepartment'
const servicesDepartament = new DepartamentServices();

const DepartamentList: FC<ContosoModel> = () => {
    const initialState = {
        departaments: [],
        departmentDelete: {},
        active: false
    }
    const [state, setState]: any = useState(initialState)
    const [context, dispatch]: any = useStateValue();
    
    console.log(context);
     
    const listDepartment=()=>{
       try {
         servicesDepartament
           .getAll()
           .then(res => {
             setState((preState: any) => ({
               ...preState,
               departaments: res.data
             }));
           })
           .catch(error => {
             console.log(error);
           });

         dispatch({ type: "changeHeader", title: "Department List" });
       } catch (error) {
         console.log(error);
       }
    }

     useEffect(() => {
         listDepartment();
     }, []);

    const handleAction = (to: string, data?: any) =>
      navigate(to, { state: data});

    const handleDelete = (data: any) => {

        setState((preState: any) => ({
            ...preState,
            active: !preState.active,
            departmentDelete:
            {
                id: data.id,
                modalActive: () => modalActive(),
                Title: `Delete department ${data.name}`
            }
        }))

    }

    console.log(state.departaments);
    

    const modalActive = () => setState((preState: any) => ({ ...preState, active: !preState.active }))

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
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.departaments.length > 0 ? (
                    state.departaments.map((depart: any, index: any) => (
                      <tr key={index}>
                        <th scope="row">{depart.id}</th>
                        <td>{depart.name}</td>
                        <td>{depart.description}</td>
                        <td>
                          <Button
                            onClick={() =>
                              handleAction("/departament/edit", depart)
                            }
                            color="link"
                            title="Edit Departament"
                          >
                            Edit
                          </Button>
                          {""}
                          <Button
                            onClick={() => handleDelete(depart)}
                            color="link"
                            title="Delete Departament"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} align="center">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
            <Col xs={1}>
              <Button
                onClick={() => handleAction("/departament/create")}
                className="btn-create"
                title="New Departament"
              >
                <FontAwesomeIcon size="lg" icon={faPlusCircle} />
              </Button>
            </Col>
            <style jsx>
              {`
                .btn-create {
                  border-radius: 50px;
                  padding: 6px 7px 6px 7px;
                }
              `}
            </style>
          </Row>
        </CardBody>
        <DeleteDepartment
          listDepartment={listDepartment}
          active={state.active}
          departmentDelete={state.departmentDelete}
        />
      </Card>
    );
}

export default DepartamentList
