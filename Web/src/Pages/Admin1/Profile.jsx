import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import SidebarHeader from "./SideBar";

export default function AdminProfile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // First useEffect: Handles user authentication and setting form data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          name: user.displayName || '',
          email: user.email || '',
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  function toggleEdit() {
    setIsEditing((prev) => !prev);
  }

  function onLogout() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  }

  function onChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function checkNameUniqueness(name, excludeUserId) {
    const q = query(collection(db, "police"), where("name", "==", name));
    const querySnapshot = await getDocs(q);

    // If there's a document and it's not the current user, the name is taken
    return !querySnapshot.empty && querySnapshot.docs.every(doc => doc.id !== excludeUserId);
  }

  async function validateForm() {
    const { name, email } = formData;
    const newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      if (newErrors.email) {
        toast.error(newErrors.email);
      }
    }
    return isValid;
  }

  async function onSubmit() {
    if (!await validateForm()) {
      return;
    }

    try {
      const { name } = formData;
      const currentUser = auth.currentUser;

      if (currentUser) {
        if (currentUser.displayName !== name) {
          if (await checkNameUniqueness(name.trim(), currentUser.uid)) {
            toast.error("Name is already in use.");
            return;
          }

          // Update display name in Firebase Auth
          await updateProfile(currentUser, {
            displayName: name,
          });

          // Update name in Firestore
          const docRef = doc(db, "police", currentUser.uid);
          await updateDoc(docRef, {
            name,
          });
        }
        toast.success("Profile details updated");
      }
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  return (
    <div className="flex h-screen">
      <SidebarHeader />
      <div className="flex-1 flex flex-col overflow-y-auto mt-16">
        <section className="mt-4 max-w-6xl mx-auto flex justify-center items-center flex-col p-6 w-full">
          <h1 className="text-3xl text-center mt-0 font-bold mb-3">Profile</h1>
          <div className="w-full md:w-[50%] mt-6 px-4 py-6 bg-white rounded-lg shadow-md">
            <form>
              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={onChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 text-lg text-gray-900 bg-gray-100 border border-gray-300 rounded-lg transition ease-in-out focus:ring-2 focus:ring-blue-300"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base mb-6">
                <p className="flex items-center space-x-3">
                  {isEditing ? (
                    <>
                      <span
                        onClick={async () => {
                          await onSubmit();
                          toggleEdit();
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out cursor-pointer"
                      >
                        Save
                      </span>
                      <span
                        onClick={toggleEdit}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out cursor-pointer"
                      >
                        Cancel
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Do you want to change your name?</span>
                      <span
                        onClick={toggleEdit}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition ease-in-out cursor-pointer"
                      >
                        Edit
                      </span>
                    </>
                  )}
                </p>
                <button
                  onClick={onLogout}
                  className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out cursor-pointer"
                  aria-label="Sign out"
                >
                  Sign out
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
