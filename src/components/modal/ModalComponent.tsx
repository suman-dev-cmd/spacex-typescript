import { Spacex } from '../../state/slice/spaceSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Container,
    Row,
    Col
  } from "reactstrap";
import moment from "moment";
import Roket from './rocket.png';
interface ModalProps{
    modal:boolean;
    errorMessage:string;
    singleItem?:Spacex;
    toggle:()=>void
}
const ModalComponent = ({modal,errorMessage,singleItem,toggle}:ModalProps) => {
    return (
        <Modal isOpen={modal} toggle={toggle} aria-labelledby="contained-modal-title-vcenter">
        <ModalHeader toggle={toggle}>Show Launch</ModalHeader>
        <ModalBody className="show-grid">
          {errorMessage ? (
            <>
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            </>
          ) : (
            <Container>
            <Row>
              <Col xs={12} md={4}>
                <img src={Roket} alt='rocket' height={100}/>
              </Col>
              <Col xs={6} md={8}>
              Flight Number: {singleItem?.flight_number}
              </Col>
            </Row>
  
            <Row>
              <Col xs={6} md={6}>
              Launched(UTC) :
              </Col>
              <Col xs={6} md={6}>
              {moment(singleItem?.launch_date_utc).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              </Col>
              <Col xs={6} md={6}>
              Location :
              </Col>
              <Col xs={6} md={6}>
              {singleItem?.launch_site?.site_name}
              </Col>
              <Col xs={6} md={6}>
              Mission :
              </Col>
              <Col xs={6} md={6}>
              {singleItem?.mission_name}
              </Col>
              <Col xs={6} md={6}>
              Orbit
              </Col>
              <Col xs={6} md={6}>
              {singleItem?.rocket?.second_stage.payloads[0].orbit}
              </Col>
              <Col xs={6} md={6}>
              Rocket
              </Col>
              <Col xs={6} md={6}>
              {singleItem?.rocket?.rocket_name}
              </Col>
            </Row>
          </Container>
          )}
        </ModalBody>
      </Modal>
    )
}

export default ModalComponent
