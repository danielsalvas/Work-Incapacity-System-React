import { useState, useEffect } from "react";
import { useStore } from "../../store";
import firebaseApp from "../../firebase/credentials";
import { getAuth, signOut } from "firebase/auth";
import userImage from "../../assets/userImage.png";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styles from "./header.module.css";
import { Props } from "../../types";
import ModalForm from "../ModalFormHr/ModalFormHr";

//Firebase

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Header = ({ uid }: Props) => {
  //Zustand and states

  const { modal, animationModal } = useStore((state) => ({
    modal: state.modal,
    animationModal: state.animationModal
  }));
  const { setError, setModal, setAnimationModal } = useStore();
  const [name, setName] = useState<string>("");

  //Get the employee name in the firebase document

  async function getDocument(id: string) {
    const docuRef = doc(firestore, `users/${id}`);
    const query = await getDoc(docuRef);

    const infoDocu = query.data();

    setName(infoDocu?.name);
  }

  getDocument(uid);

  //Functions

  const logOut = () => {
    signOut(auth);
    setError("");
  };

  const handleNewIncapacity = () => {
    setModal(true)

    setTimeout(() => {
      setAnimationModal(true)
    }, 500);
  }
  return (
    <div className={styles.container__header}>
      <div className={styles.container__info_user}>
        <img src={userImage} alt="user-image" />
        <div className={styles.info__user}>
          <p>{name}</p>
          <a onClick={logOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>Log out
          </a>
        </div>
      </div>
      <div className={styles.button__new__aplication}>
        <button onClick={handleNewIncapacity}>New Aplication</button>
      </div>

      {modal && <ModalForm />}
    </div>
  );
};

export default Header;
