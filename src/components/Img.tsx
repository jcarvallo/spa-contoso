import React, { FC } from 'react'

interface ImgProps {
    res?: string;
    name?: string;
}
const Img: FC<ImgProps> = ({ ...res }) => {

    let imagen = require(`../assets/images/${res.name}.svg`)

    return (
        <>
            <img src={imagen} alt={res.name} className={`image__${res.name}`}></img>
            <style jsx>
                {`.image__logo{
                 width: 100px;
                 height: 100px;
              }
            `}
            </style>
        </>
    )
}

export default Img
