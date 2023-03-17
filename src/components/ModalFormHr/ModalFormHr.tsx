import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useStore } from "../../store";
import styles from "./modalform.module.css";
import close from "../../assets/close.svg";
import useUsers from "../../hooks/useUsers";
import { formattedDate } from "../../helpers/dataTableColumns";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import useIncapacities from "../../hooks/useIncapacities";

const firestore = getFirestore(firebaseApp);

const ModalFormHr = () => {
  //Custom hook to obtain all the users in the database
  const { allUsers } = useUsers();

  useEffect(() => {
    const queryCollection = collection(firestore, "workIncapacities");
    getDocs(queryCollection).then((res) =>
      console.log(res.docs.map((incapacity) => ({ ...incapacity.data() })))
    );
  }, []);

  //Zustand and states

  const { animationModal } = useStore((state) => ({
    animationModal: state.animationModal,
  }));
  const { setModal, setAnimationModal } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Create new incapacity application

  const onSubmit = async (data: any) => {
    //Close Modal
    setAnimationModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);

    const employeeId = data.employee

    const findEmployee = allUsers.find(
      (user: any) => user.employeeId === employeeId
    ); //Getting the employee name

    //Data with employee identifier

    const newApplication = {
      employeeId: employeeId,
      employee: findEmployee.name,
      medicalUnit: data.medicalUnit,
      doctor: data.doctor,
      coverageDays: data.coverageDays,
      startDate: data.startDate,
      endDate: data.endDate,
      medical: data.medical,
      applicationDate: formattedDate,
    };

    addDoc(collection(firestore, "workIncapacities"), newApplication);
  };

  //Hide Modal Form function

  const hideModal = () => {
    setAnimationModal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.close_modal}>
          <img src={close} alt="close" onClick={hideModal} />
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} ${
            animationModal ? styles["animation"] : styles["close"]
          }`}
        >
          <legend>Sick Leave Application</legend>

          <div className={styles.container__form}>
            <div>
              {/* EMPLOYEE */}

              <div className={styles.field}>
                <p>Choose Employee</p>

                <select {...register("employee")}>
                  {allUsers.map((user: any) => (
                    <option key={user.employeeId} value={user.employeeId}>
                      {user.name}
                    </option>
                  ))}
                </select>

                {errors.employee && (
                  <span className={styles.error}>
                    {errors.employee.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>

              {/* MEDICAL UNIT */}

              <div className={styles.field}>
                <p>Medical Unit</p>
                <input
                  type="text"
                  placeholder="ISSS"
                  {...register("medicalUnit", {
                    required: true,
                  })}
                />

                {errors.medicalUnit && (
                  <span className={styles.error}>
                    {errors.medicalUnit.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>

              {/* DOCTOR */}

              <div className={styles.field}>
                <p>Doctor</p>
                <input
                  type="text"
                  placeholder="Francisco Menjivar"
                  {...register("doctor", {
                    required: true,
                  })}
                />

                {errors.doctor && (
                  <span className={styles.error}>
                    {errors.doctor.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>
            </div>

            <div>
              {/* DAYS OF COVERAGE */}

              <div className={styles.field}>
                <p>Days of coverage</p>
                <input
                  type="number"
                  placeholder=""
                  min="1"
                  {...register("coverageDays", {
                    required: true,
                  })}
                />

                {errors.coverageDays && (
                  <span className={styles.error}>
                    {errors.coverageDays.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>

              {/* SICK LEAVE START DATE*/}

              <div className={styles.field}>
                <p>Sick leave start date</p>
                <input
                  type="date"
                  min="2023-01-01"
                  {...register("startDate", {
                    required: true,
                  })}
                />

                {errors.startDate && (
                  <span className={styles.error}>
                    {errors.startDate.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>

              {/* SICK LEAVE END DATE */}

              <div className={styles.field}>
                <p>Sick leave end date</p>
                <input
                  type="date"
                  min="2023-01-01"
                  {...register("endDate", {
                    required: true,
                  })}
                />

                {errors.endDate && (
                  <span className={styles.error}>
                    {errors.endDate.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* MEDICAL DIAGNOSTIC */}
          <p className={styles.medical__diagnostic__paragraph}>
            Medical Diagnostic
          </p>
          <div className={styles.medical__diagnostic}>
            <input
              type="textarea"
              placeholder="Lorem ipsum dolor sit amet consectetur. Dui a nulla aenean fermentum ut ut rutrum molestie dictum. Faucibus nisl elementum enim potenti ut lorem tellus turpis odio. Mattis in adipiscing rutrum arcu eu diam praesent mattis mi. Ullamcorper turpis nec vitae eget donec vulputate imperdiet massa dui."
              {...register("medical", {
                required: true,
              })}
            />
            {errors.medical && (
              <span className={styles.error}>
                {errors.medical.type === "required" && "This field is required"}
              </span>
            )}
          </div>

          {/* SUBMIT */}

          <div className={styles.input__submit}>
            <input type="submit" value="Submit Application" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalFormHr;
