import React, { FC } from 'react'
import { Row, Col } from 'reactstrap'
import { Carousel } from '../../components'
import { ContosoModel } from '../../models/contoso.model'

const Index:FC<ContosoModel> = ({...res}) => {
    return (
        <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
                <Carousel />
            </Col>
        </Row>
    )
}

export default Index
