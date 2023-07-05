import { useEffect, useState } from "react";
import { Accordion, Stack, Form, Button } from "react-bootstrap";
import EmployeeProfile from "./EmployeeProfile";
import Navbar from "./Navbar";

interface User {
  firstName: string;
  lastName: string;
}

const EmployeeProfiles = () => {
  const [users, setUsers] = useState([
    {
      firstName: "",
      lastName: "",
      SSN: "",
      title: "",
      cellPhone: "",
      email: "",
    },
  ]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/admin/profiles");
      console.log(res)
      res.json().then((data) => {
        console.log(data)
        setUsers(data)});
    }
    fetchUsers();
  }, []);

  const displayedUsers = [...users];
  //console.log(displayedUsers);
  displayedUsers.sort((a: User, b: User) =>
    a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0
  );

  return (
    <>
    <Navbar></Navbar>
      <div>
        <h3 className="text-center mt-3">Employee Profiles</h3>

        <Stack direction="horizontal">
          <p className="text-secondary">Number of Employees: {users.length}</p>
          <p className="text-secondary ms-auto"></p>
        </Stack>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>SERACH</Form.Label>
            <Form.Control type="text" placeholder="" />
            <Form.Text className="text-muted">
              Search users by first, last, preferred names
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        <Accordion>
          {displayedUsers.map((user) => (
            <EmployeeProfile user={user} />
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default EmployeeProfiles;
