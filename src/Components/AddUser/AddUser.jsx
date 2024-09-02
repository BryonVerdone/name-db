import { useState } from "react";

function AddUser() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to server
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage("User added successfully");
    } else {
      setMessage(`Error: ${result.error}`);
    }

    //clear form

    setId("");
    setName("");
  };

  return (
    <section>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>: ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            require
          />
        </div>
        <div>
          <label>: Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            require
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}
export default AddUser;
