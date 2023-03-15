import { useStore } from "../../store";
import firebaseApp from "../../firebase/credentials";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

interface FormInputs {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  const { isRegistering, errorLogin } = useStore((state) => ({
    isRegistering: state.isRegistering,
    errorLogin: state.errorLogin,
  }));

  const { setIsRegistering, setErrorLogin } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    const email = data.email;
    const password = data.password;
    const role = data.role;

    if (isRegistering) {
      //Register
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setErrorLogin("There is an account with this data");
      }
    } else {
      //Login
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setErrorLogin("There is no account with this data");
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
            <select
              {...register("role", {
                required: true,
                minLength: 6,
              })}
            >
              <option value="admin">Admin</option>
              <option value="admin">User</option>
            </select>

            {errors.role && (
              <span>
                {errors.role.type === "required" && "This field is required"}
              </span>
            )}
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
