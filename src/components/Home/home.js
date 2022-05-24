import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function Home(props) {
  var udata = {};
  getDoc(doc(db, "users", props.user.uid)).then((docs) => {
    udata = docs.data();
    if (udata.firstTime) {
      updateDoc(doc(db, "users", udata.uid), { firstTime: false }).then(
        (fx) => {
          window.location = "./profile";
        }
      );
    }
    console.log(docs.data());
  });

  if (udata == {}) {
    return <div></div>;
  } else {
    return <div></div>;
  }
}
