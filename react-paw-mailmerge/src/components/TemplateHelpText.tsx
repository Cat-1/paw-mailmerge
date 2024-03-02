import Card from "react-bootstrap/card";

const TemplateHelpText: React.FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>How to write a template</Card.Title>
                <Card.Text>
                    Use the text editor below to write your message template. <br></br>
                    Suppose you want to insert data from a column in the CSV file called first_name, type in first_name surrounded by double braces: {"{{first_name}}"} <br></br>
                    With a CSV file uploaded, you may use the buttons populated below the text editor to conveniently insert the corresponding column name at your cursor's position. 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TemplateHelpText