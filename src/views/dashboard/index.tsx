import React, { FC, useEffect } from 'react'
import { ContosoModel } from '../../models/contoso.model'
import { useStateValue } from '../../contexts/index'
import { Carousel } from '../../components/index'
import { Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import { navigate } from '@reach/router';

const Dashboard: FC<ContosoModel> = () => {
    const [context, dispatch]: any = useStateValue();
    
    useEffect(() => {
        dispatch({ type: 'changeHeader', title: 'Contoso  University', dashboard:true })
    }, [dispatch])
    
    const logout=()=>{
        dispatch({ type: 'initialState'})
        navigate('/')
    }
    const navLink = (href:string)=>{
        navigate(href)
    }
    return (
        <div>
            <Row className="content">
                <Col xs={12}>
                    <Nav className="mb-4">
                        {context.navBar.map((nav: any, index: any) => (
                            <NavItem key={index}>
                                <NavLink href={'#'} onClick={() => navLink(nav.href)}><Button>{nav.label}</Button></NavLink>
                            </NavItem>
                        ))}
                        <NavItem>
                            <NavLink href={'#'} onClick={() => logout()}><Button>Logout</Button></NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <Carousel />
                </Col>
            </Row>
            <style jsx>
                {`
                .content{
                    margin-bottom:30px;
                }
             `}
            </style>
        </div>
    )
}

export default Dashboard
