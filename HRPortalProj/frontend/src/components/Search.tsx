// import { useState } from "react";
// import { Accordion, ListGroup, Row, Col, Stack } from "react-bootstrap";
// import { Link } from "react-router-dom";

// interface Props {
//   [key: string]: any;
// }

// function Search(user: Props) {
//   const [userList, setUserList] = useState(user);
//   const [text, setText] = useState("");

//   const handleOnClick = () => {
//     const findUsers =
//       userList && userList?.length > 0
//         ? userList?.filter((u: any) => u?.name === text)
//         : undefined;
//     setUserList(findUsers);
//   };

//   return (
//     <>
//       <div>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button onClick={handleOnClick}>Search</button>
//       </div>
//       <div>
//         {userList?.length > 0 &&
//           userList?.map((user: Props) => {
//             return <p>email:{user.user.email}</p>;
//           })}
//       </div>
//     </>
//   );
// }

// export default Search;

// import { Stack, Form, Button } from "react-bootstrap";

// interface Props {
//     search :any
//     setSearch:any
// }

// function Search() {
//   return (
//     <Stack direction="horizontal" gap={2} className="my-3">
//       <Form.Control
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="me-auto"
//         placeholder="Search users by first, last, preferred names ..."
//       />
//       <Button variant="dark">Search</Button>
//     </Stack>
//   );
// }

// export default Search;
