import { login } from "../../app/lib/auth";

const LoginButton = ({ method, ...rest }) => {
  return <button onClick={() => login(method)}>{rest.children}</button>;
};
export default LoginButton;
