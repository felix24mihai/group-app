const PeopleGroupTable = (props) => {
    
    const personsList = props.personsList;
    const num = personsList.length;
    if (num === 0){
        return (
            <div className="container"></div>
        )
    } else{
        return (
            <div className="container">
                <br/>
                <table class="table table-success table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Job</th>
                    <th scope="col">Team</th>
                    </tr>
                </thead>
                    <tbody>
                    {personsList.map((person) => (
                            <tr>
                            <td>
                                <a href={`/persons/${person.id}`}>{ person.first_name }</a>
                            </td>
                            <td>
                                <a href={`/persons/${person.id}`}>{ person.last_name }</a>
                            </td>
                            <td>
                                <a href={`/persons/${person.id}`}>{ person.job }</a>
                            </td>
                            <td>
                                <a href={`/persons/${person.id}`}>{ person.group_name }</a>
                            </td>

                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PeopleGroupTable;