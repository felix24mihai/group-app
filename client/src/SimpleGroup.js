import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditGroup from './EditGroup';
import MoveGroup from './MoveGroup';
import PeopleTable from './PeopleTable';

const SimpleGroup = () => {

    const { id } = useParams();
    const [group, setGroup] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [job, setJob] = useState("");
    const [personsList, setPersonsList] = useState([]);
    const [numPersons, setNumPersons] = useState(0);
    

    useEffect(() => {
        fetch('http://localhost:3001/api/groups/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setGroup(data);
            setGroupName(data[0].group_name);
        })

        fetch('http://localhost:3001/api/groups/people/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setPersonsList(data);
            setNumPersons(data.length);
        })
    }, []);

    const addPerson = () => {
        if (firstName === "" || lastName === "" || job === ""){
            alert("All fields are mandatory!");
        } else{
            Axios.post('http://localhost:3001/api/people', 
            {firstName: firstName, lastName: lastName, job: job, groupId: id }).then(() => {
                console.log("Person added");
            });
        }
    };
    

    return (
        <div>
            <div className="card" >
                {group.map((group) => (
                    <div>
                        <div class="card-header"><h5>{ group.group_name }</h5> <strong>Contains { numPersons } persons</strong></div>
                        <br/>
                    </div>
                ))}
                <PeopleTable personsList={personsList}/>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="card" >
                <h5 className="card-header">Add a new person to this group</h5>
                <div class="card-body">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First name: </Form.Label>
                            <br/>
                            <input type="text" onChange={(event) => {
                                setFirstName(event.target.value);
                            }} />
                            <br/>
                            <Form.Label>Last name: </Form.Label>
                            <br/>
                            <input type="text" onChange={(event) => {
                                setLastName(event.target.value);
                            }} />
                            <br/>
                            <Form.Label> Job: </Form.Label>
                            <br/>
                            <input type="text" onChange={(event) => {
                                setJob(event.target.value);
                            }} />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" onClick={addPerson}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            <br/>
            <EditGroup id={id} />
            <br/>
            <MoveGroup id={id} groupName={groupName}/>
        </div>
    );
}

export default SimpleGroup;