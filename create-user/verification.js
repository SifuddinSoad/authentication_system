const verificationPage = (userId) => {
  return `
    <h1>Email Verification</h1>
    <p>Please verify your email address by entering the code sent to your inbox.</p>
    <form action="/verify-code?id=${userId}" method="POST">
        <input type="text" name="code" pattern="\\d{6}" maxlength="6" minlength="6" placeholder="Enter 6-digit code" required />
        <button type="submit">Verify</button>
    </form>
  `;
};

export default verificationPage;