import React, { FC } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import {DepartamentServices} from '../../../services/index'

const services= new DepartamentServices()

interface DeleteDepartmentProps {
    active?: boolean;
    departmentDelete?: any;
    listDepartment?:any;
}

const DeleteDepartment: FC<DeleteDepartmentProps> = ({ ...res }) => {
   
    const { modalActive, Title, id } = res.departmentDelete;
    const { listDepartment } = res;
   
    const close = () => modalActive()

    const deleteDepart = (id: any) => {
       try {
           services.delete(parseInt(id))
            .then(res=>{
                if (res.data === "OK"){
                    listDepartment();
                    close()

                } 
            }).catch(error=>console.log(error)
            )
       } catch (error) {
           console.log(error);
           
       }

    }

    return (
        <Modal isOpen={res.active} fade={false} toggle={() => close()} >
            <ModalHeader toggle={() => close()}>{Title}</ModalHeader>
            <ModalBody className="text-center">
                Are you sure to delete this department?
                    </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => deleteDepart(id)}>Yes</Button>{' '}
                <Button color="secondary" onClick={() => close()}>No</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteDepartment;
