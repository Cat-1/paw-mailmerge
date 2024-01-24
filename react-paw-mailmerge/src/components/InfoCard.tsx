import Card from "react-bootstrap/card";
import ListGroup from 'react-bootstrap/ListGroup';

const InfoCard: React.FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>About PAW MailMerge</Card.Title>
                <Card.Text>
                    Privacy-sensitive, email provider-agnostic, web-based mail merge.
                </Card.Text>
            </Card.Body>
            <ListGroup as="ol" numbered>
                <ListGroup.Item>Upload CSV file</ListGroup.Item>
                <ListGroup.Item>Compose a template</ListGroup.Item>
                <ListGroup.Item>Get mail merge results</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default InfoCard