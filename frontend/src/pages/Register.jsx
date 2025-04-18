import Form from "@/components/Form";

function Register () {
  return (
    <div>
      <Form route="/api/users/register/" method="register" />
    </div>
  );
}

export default Register;