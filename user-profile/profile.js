import User from "../models/user.js";

const profilePage = async (user) => {
  const userData = await User.findById(user.id);
  if (!userData) {
    return `<h1>User not found</h1>`;
  }
  const { firstname, lastname, email } = userData;
  return `
    <h1>User Profile</h1>
    <p>Name: ${firstname} ${lastname}</p>
    <p>Email: ${email}</p>
  `;
};

export default profilePage;
