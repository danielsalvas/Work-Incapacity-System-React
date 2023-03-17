import { useStore } from "../../store";
import firebaseApp from "../../firebase/credentials";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FormData } from "../../types";
import styles from "./login.module.css";
import itoLogo from "../../assets/ito.png";

// Firebase constants

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Login = () => {
  //Zustand

  const { isRegistering, error } = useStore((state) => ({
    isRegistering: state.isRegistering,
    error: state.error,
  }));

  const { setIsRegistering, setError } = useStore();

  //React Hook Form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  //Functions

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const role = data.role;

    if (isRegistering) {
      //Register
      try {
        const infoUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then((userFirebase) => {
          return userFirebase;
        });

        const docuRef = doc(firestore, `users/${infoUser.user.uid}`);

        setDoc(docuRef, { name: name, email: email, role: role, employeeId: infoUser.user.uid });
      } catch (error) {
        setError("Account already exists with this email");
      }
    } else {
      //Login
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setError("There is no account with this data, you must register");
      }
    }
  };

  return (
    <div className={styles.container__login__component}>
      {/* FORM */}

      <div className={styles.container__elements}>
        <form
          className={styles.container__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <img className={styles.ito__logo} src={itoLogo} alt="ito-logo" />
          <legend>{isRegistering ? "Sign Up" : "Login"}</legend>
          <span className={styles.account__error}>{error}</span>

          {/* NAME */}

          {isRegistering && (
            <div className={styles.container__input__error}>
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <span className={styles.input__error}>
                  {errors.name.type === "required" && "This field is required."}
                </span>
              )}
            </div>
          )}

          {/* EMAIL */}

          <div className={styles.container__input__error}>
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <span className={styles.input__error}>
                {errors.email.type === "required" && "This field is required."}
                {errors.email.type === "pattern" && "Invalid Email Address"}
              </span>
            )}
          </div>

          {/* PASSWORD */}

          <div className={styles.container__input__error}>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />

            {errors.password && (
              <span className={styles.input__error}>
                {errors.password.type === "required" &&
                  "This field is required"}
                {errors.password.type === "minLength" &&
                  "Min length of password is 6 Char"}
              </span>
            )}

            {!isRegistering && (
              <a className={styles.forgot__password} href="">
                Forgot password?
              </a>
            )}
          </div>

          {/* ROLE */}

          {isRegistering ? (
            <div className={styles.container__input__error}>
              <p>Choose your role in the company:</p>
              <select {...register("role")}>
                <option value="hrspecialist">HR Specialist</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          ) : null}

          {/* SUBMIT */}

          <div>
            <input
              className={styles.submit__button}
              type="submit"
              value={isRegistering ? "Sign Up" : "Log in"}
            />
          </div>
        </form>

        {/* FORM TOGGLE */}

        <div className={styles.form__toggle}>
          <p>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <a onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Login" : "Sign Up"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
