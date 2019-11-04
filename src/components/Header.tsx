import React, { FC, useState, useEffect } from 'react'
import { Row, Col, Button, Card } from 'reactstrap'
import { useStateValue } from '../contexts/index'
import { navigate } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Img } from '../components/index'

const Header: FC = () => {
    
    const [{ title, isLogo, back, user }, dispatch]: any = useStateValue()
    const [state, setState] = useState({ colLogo: 4, colTitle: 4, colUser: 4, user: { perfil: '' } })

    const goBack = () => {
        dispatch({ type: 'changeHeader', title: title })
        window.history.back()
    }
    const login = () => {
        dispatch({ type: 'setUser', user: { perfil: 'Admin' } })
        navigate('/dashboard')
    }

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setState((preState: any) => ({
                ...preState,
                colLogo: 2,
                colTitle: 8,
                colUser: 2,
                user: user
            }))
        }

    }, [setState, user])

    const menu = () => navigate('/dashboard')

    let isLogoOrMenu = isLogo ? (<Img name="logo" />)
        : !back ? (<Button onClick={() => menu()} color="link" title="Go to Menu" className="link-menu">Menu</Button>)
                : (<Button onClick={() => goBack()} color="link" title="Go to Back" className="link-menu">Back</Button>)

    return (
        <>
            <Row className="header-base">
                <Col xs={state.colLogo}>{isLogoOrMenu}</Col>
                <Col xs={state.colTitle} className="text-center title"><h3>{title}</h3></Col>
                {Object.keys(user).length > 0 ?
                    <Col xs={state.colUser} align="center" className="user">
                        <Card body className="card-content">
                            <FontAwesomeIcon size="lg" icon={faUser} />
                        </Card>
                        <p>{state.user.perfil}</p>
                    </Col>
                    :
                    <Col xs={state.colUser} align="center" className="user">
                        <Button>Register</Button>{' '}<Button onClick={() => login()}>Login</Button>
                    </Col>
                }
                <style jsx>
                    {`
                .header-base{
                    padding: 0;
                }
                .title{
                    padding-top: 34px;
                }
                .link-menu{
                    padding-top: 34px;
                }
                .user{
                    padding-top: 34px;
                }
                .card-content{
                    width: 80px;
                    height: 70px;
                    color: darkblue;
                }
            `}
                </style>
            </Row>
        </>
    )
}

export default Header
