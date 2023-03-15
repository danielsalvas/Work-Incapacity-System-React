import { useStore } from "../../store";
import firebaseApp from "../../firebase/credentials";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FormData } from "../../types";

// Firebase constants

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Login = () => {
  //Zustand

  const { isRegistering, errorLogin } = useStore((state) => ({
    isRegistering: state.isRegistering,
    errorLogin: state.error,
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

        console.log(infoUser);

        const docuRef = doc(firestore, `users/${infoUser.user.uid}`);

        setDoc(docuRef, { email: email, role: role });
      } catch (error) {
        setError("Account already exists");
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
    <div>
      {/* FORM */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>{isRegistering ? "Register" : "Login"}</legend>

        {/* EMAIL */}

        <div>
          <p>EMAIL *</p>
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && (
            <span>
              {errors.email.type === "required" && "This field is required."}
              {errors.email.type === "pattern" && "Invalid Email Address"}
            </span>
          )}
        </div>

        {/* PASSWORD */}

        <div>
          <p>PASSWORD *</p>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />

          {errors.password && (
            <span>
              {errors.password.type === "required" && "This field is required"}
              {errors.password.type === "minLength" &&
                "Min length of password is 6 Char"}
            </span>
          )}
        </div>

        {/* ROLE */}

        {isRegistering ? (
          <div>
            <p>ROLE *</p>
            <select {...register("role")}>
              <option value="hrspecialist">HR Specialist</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        ) : null}

        {/* SUBMIT */}

        <div>
          <input type="submit" value={isRegistering ? "Register" : "Login"} />
        </div>
      </form>

      <div>
        <p>
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Login" : "Register"}
        </button>
      </div>

      {errorLogin}
    </div>
  );
};

export default Login;
