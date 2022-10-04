import { useState } from "react";

const Signin = ({ onRouteChange, loadUser }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorText, setErrorText] = useState(false);

  const onEmailChange = (event) => {
    setEmailInput(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const onSubmitSignIn = async () => {
    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });
    const data = await response.json();
    if (data.id) {
      loadUser(data);
      onRouteChange("home");
      setErrorText(false);
    } else {
      setErrorText(true);
    }
  };
  return (
    <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 center ">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          {errorText && (
            <p style={{ color: "red", marginTop: "-10px" }}>
              Wrong credentials
            </p>
          )}
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};
export default Signin;
