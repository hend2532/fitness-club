import { useEffect, useState } from "react";
import "../css/user.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  const fetchUsers = () => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setNewRole(user.role);
  };

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSaveClick = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId);
    fetch(`http://localhost:3001/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userToUpdate,
        role: newRole,
      }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditUserId(null);
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteClick = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user">
      <h1>Users Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {editUserId === user.id ? (
                  <select value={newRole} onChange={handleRoleChange}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <button onClick={() => handleSaveClick(user.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                )}
                <button onClick={() => handleDeleteClick(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
