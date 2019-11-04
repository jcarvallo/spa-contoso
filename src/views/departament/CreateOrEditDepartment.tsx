import React, { FC, useEffect, useState } from 'react'
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ContosoModel } from '../../models/contoso.model'
import { useStateValue } from '../../contexts/index'


const CreateOrEditDepartment: FC<ContosoModel> = ({ ...res }) => {

    const initialState = { 
        id: '', 
        title: '', 
        description: '',
    };
    const [state, setState] = useState(initialState)
    const [context, dispatch]: any = useStateValue();
    const { action, location } = res;

    console.log(context);

    const title = action === 'create' ? 'New departament' : `Edit departament ${location.state.title}`;

    useEffect(() => {
        if (action === 'edit') {
            let data = location.state
            setState((preState: any) =>
                ({
                    ...preState,
                    id: data.id,
                    title: data.title,
                    description: data.description
                })
            )
        }
        dispatch({ type: 'changeHeader', title: title, back: true })
    }, [dispatch, action, setState, location.state, title])

    const handelChange = ({ target }: any) => {
        let { name, value } = target
        setState(preState => ({ ...preState, [name]: value }))
    }

    const handelSubmit = () => {
        alert(JSON.stringify(state))
    }

    const clear = () => setState(initialState)
    
    return (
        <Card body>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" value={state.title} onChange={(e) => handelChange(e)} name="title" id="title" placeholder="Title departament" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Description</Label>
                            <Input type="textarea" value={state.description} onChange={(e) => handelChange(e)} name="description" id="description" />
                        </FormGroup>
                        <Row className="text-center">
                            <Col xs={action === 'create' ? 6 : 12}>
                                <Button onClick={() => handelSubmit()} block>{action === 'create' ? 'Save' : 'Edit'}</Button>{' '}
                            </Col>
                            {action === 'create' &&
                                <Col xs={6}>
                                    <Button onClick={() => clear()} block>Clear</Button>
                                </Col>
                            }
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default CreateOrEditDepartment
