import React, { FC } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface DeleteCourseProps {
  active?: boolean;
  courseDelete?: any;
}

const DeleteCourse: FC<DeleteCourseProps> = ({ ...res }) => {
  const { modalActive, Title, ID } = res.courseDelete;

  const close = () => modalActive();

  const deleteCourse = (id: any) => alert(`Delete Course id ${id}`);

  return (
    <Modal isOpen={res.active} fade={false} toggle={() => close()}>
      <ModalHeader toggle={() => close()}>{Title}</ModalHeader>
      <ModalBody className="text-center">
        Are you sure to delete this course?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => deleteCourse(ID)}>
          Yes
        </Button>{" "}
        <Button color="secondary" onClick={() => close()}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteCourse;
