import React, { FC } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

interface DeleteDepartmentProps {
    active?: boolean;
    departmentDelete?: any;
}

const DeleteDepartment: FC<DeleteDepartmentProps> = ({ ...res }) => {
   
    const { modalActive, title, id } = res.departmentDelete
   
    const close = () => modalActive()

    const deleteDepart = (id: any) => alert(`Delete department id ${id}`)

    return (
        <Modal isOpen={res.active} fade={false} toggle={() => close()} >
            <ModalHeader toggle={() => close()}>{title}</ModalHeader>
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
