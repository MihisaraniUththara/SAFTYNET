import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [Owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getOwner() {
      try {
        const docRef = doc(db, "users", userRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOwner(docSnap.data());
        } else {
          toast.error("Could not get Owner data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching Owner data");
      }
    }

    getOwner();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  function handleAction() {
    window.location.reload();
  }

  return (
    <>
      {Owner && (
        <div className="flex flex-col w-full">
          <p>Contact Owner for the {listing.name.toLowerCase()}</p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows={2}
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <button
              className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-16 py-2 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800"
              type="button"
              onClick={() =>
                (window.location.href = `mailto:${Owner.email}?Subject=${listing.name}&body=${message}`)
              }
            >
              Send Message
            </button>
            <button
              className="mt-3 cursor-pointer w-full bg-gradient-to-r from-red-500 to-red-700 text-white px-16 py-2 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800"
              type="button"
              onClick={handleAction}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
