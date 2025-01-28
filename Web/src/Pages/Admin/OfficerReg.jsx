import React, {useState, useEffect} from 'react'
import { getFirestore, doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"
import {auth} from '../../firebase'


const OfficerReg = () => {
    const db = getFirestore();

   
        const [formData, setFormData] = useState({
          phone: "",
          dob: "",
          appointmentDate: "",
          email: "",
          nic: "",
          badgeNumber: "",
        station: "",
        role: "",
        password: "",
        name: "",
        });
        const [errors, setErrors] = useState({});
        const [stations, setStations] = useState([]);

        useEffect(() => {
            // Fetch stations from the police_stations collection
            const fetchStations = async () => {
              try {
                const stationRef = collection(db, "police_stations");
                const stationSnapshot = await getDocs(stationRef);
                const stationList = stationSnapshot.docs
                  .map(doc => doc.data().station_name) // Assuming 'station_name' field has the station names
                  .sort((a, b) => a.localeCompare(b)); // Sort alphabetically
                
                setStations(stationList);
              } catch (error) {
                console.error("Error fetching stations:", error);
                alert("Failed to fetch stations. Please try again.");
              }
            };
          
            fetchStations();
          }, [db]);
          
      
        const validatePhone = (value) => {
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(value)) {
            return 'Phone number must be exactly 10 digits';
          }
          return '';
        };
      
        const validateDOB = (value) => {
          const currentYear = new Date().getFullYear();
          const year = new Date(value).getFullYear();
          if (year < currentYear - 65 || year > currentYear - 17) {
            return `Date of birth must be between ${currentYear - 65} and ${currentYear - 17}`;
          }
          return '';
        };

        const validateAppointmentDate = (value) => {
            const currentYear = new Date().getFullYear();
            const year = new Date(value).getFullYear();
            
            if (year < currentYear - 47 || year > currentYear) {
              return `Appointment date must be between ${currentYear - 47} and ${currentYear}`;
            }
            return '';
          };

          const validateEmail = (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
              return 'Email is required.';
            }
            if (!emailRegex.test(value)) {
              return 'Please enter a valid email address.';
            }
            return '';
          };

          const validateNIC = (value) => {
            const nicRegex12 = /^\d{12}$/; // Matches 12-digit numbers
            const nicRegex9 = /^\d{9}[vV]$/; // Matches 9 digits followed by 'V' or 'v'
        
            if (!nicRegex12.test(value) && !nicRegex9.test(value)) {
              return 'NIC must be either 12 digits or 9 digits followed by "V"';
            }
            return '';
          };
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
      
          let error = '';
          if (name === 'phone') {
            error = validatePhone(value);
          } else if (name === 'dob') {
            error = validateDOB(value);
          }else if (name === 'appointmentDate') {
            error = validateAppointmentDate(value);
          }else if (name === 'email') {
            error = validateEmail(value);
          }else if (name === 'nic') {
            error = validateNIC(value);
          }
      
          setErrors({ ...errors, [name]: error });
        };
        
      
        const handleSubmit = async(e) => {
          e.preventDefault();
      
          const phoneError = validatePhone(formData.phone);
          const dobError = validateDOB(formData.dob);
          const appointmentDateError = validateAppointmentDate(formData.appointmentDate);
          const emailError = validateEmail(formData.email);
          const nicError = validateNIC(formData.nic);
      
          if (phoneError || dobError || appointmentDateError || emailError || nicError) {
            setErrors({
              phone: phoneError,
              dob: dobError,
              appointmentDate: appointmentDateError,
              email: emailError,
              nic: nicError,
            });
            return;
          }

          try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            );
      
            const uid = userCredential.user.uid;
      
            // Data to save
            const officerData = {
              uid,
              phone: formData.phone,
              dob: formData.dob,
              appointmentDate: formData.appointmentDate,
              email: formData.email,
              nic: formData.nic,
              badgeNumber: formData.badgeNumber,
              station: formData.station,
              role: formData.role,
              name: formData.name,
              suspend: false,
      retire: false,
      day: false,
      night: false,
            };
      
            // Save to police collection
            const officerRef = doc(db, "police", `${formData.nic}_${formData.badgeNumber}`);
            await setDoc(officerRef, officerData);

                // Check if station already has an OIC record, update or create a new one
    const oicRef = doc(db, "oic", formData.station); // Using station as the primary key
    const oicSnapshot = await getDoc(oicRef);

    if (oicSnapshot.empty) {
      // No existing record for this station, create a new one
      await setDoc(oicRef, officerData);
    } else {
      // Update the existing record for this station
      await setDoc(oicRef, officerData, { merge: true });
    }
      
            // Save to role-specific collection
            if (formData.role === "Traffic") {
              const trafficRef = doc(db, "traffic", `${formData.nic}_${formData.badgeNumber}`);
              await setDoc(trafficRef, officerData);
            } else if (formData.role === "TrafficH") {
              const headOfficeRef = doc(db, "head_office", `${formData.nic}_${formData.badgeNumber}`);
              await setDoc(headOfficeRef, officerData);
            }
      
            alert("Officer registered successfully!");

            setFormData({
              phone: "",
              dob: "",
              appointmentDate: "",
              email: "",
              nic: "",
              badgeNumber: "",
              station: "",
              role: "",
              password: "",
              name: "",
            });
            setErrors({});
          } catch (error) {
            console.error("Error registering officer:", error);
            alert("Error registering officer: " + error.message);
          }
        };
      
             

  return (
    <div className='overflow-hidden p-2'>
        <div className = 'bg-white pt-3 pb-2'>
        <h1 className='text-black text-center text-3xl font-bold mb-3'>Registration Form</h1>
            <form className="font-[sans-serif] m-6 max-w-4xl mx-auto" 
            onSubmit={handleSubmit}>
    <div className="grid sm:grid-cols-2 gap-10">
      <div className="relative flex items-center">
        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Name</label>
        <input type="text" 
        name='name'
        placeholder="Enter name"
          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" 
          value={formData.name}
          onChange={handleInputChange}/>
        
      </div>



      <div className="relative flex items-center">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Phone No</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone no."
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</p>}
            </div>

            <div className="relative flex items-center">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">NIC</label>
              <input
                type="text"
                name="nic"
                placeholder="Enter NIC Number"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                value={formData.nic}
                onChange={handleInputChange}
              />
              {errors.nic && <p className="text-red-500 text-xs mt-1 ml-2">{errors.nic}</p>}
            </div>

            <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                Police ID
            </label>
            <input
                type="number"
                name="badgeNumber"
                placeholder="Enter police ID/Badge Number"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                value={formData.badgeNumber}
                onChange={handleInputChange}
            />
            </div>


      <div className="relative flex items-center">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Date of Birth</label>
              <input
                type="date"
                name="dob"
                placeholder="Enter date of birth"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1 ml-2">{errors.dob}</p>}
            </div>

      <div className="relative flex items-center">
        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Date of Appoinment</label>
        <input type="date" name="appointmentDate" placeholder="Enter date of Appoinment"
          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          value={formData.appointmentDate}
          onChange={handleInputChange} />
          {errors.appointmentDate && (
                <p className="text-red-500 text-xs mt-1 ml-2">{errors.appointmentDate}</p>
              )}
      </div>

      


      <div className="relative flex items-center">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Station</label>
              <select
                name="station"
                value={formData.station}
                onChange={handleInputChange}
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              >
                <option value="" disabled>Select Station</option>
                {stations.map((station, index) => (
                  <option key={index} value={station}>{station}</option>
                ))}
              </select>
            </div>

      <div className="relative flex items-center">
  <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
    Role
  </label>
  <select
    name="role"
    value={formData.role}
    onChange={handleInputChange}
    className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
  >
    <option value="" disabled>
      Select Role
    </option>
    <option value="Traffic">Traffic Police Officer</option>
    <option value="OIC">Officer In Charge</option>
    <option value="TrafficH">Head Office Police Officer</option>
    <option value="other">Other</option>
    <option value="Admin">Admin</option>
  </select>
</div>

<div className="relative flex items-center sm:col-span-2">
              <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>
              )}
            </div>

      <div className="relative flex items-center sm:col-span-2">
        <label
          className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Password</label>
        <input
  type="password"
  name="password"
  placeholder="Enter password"
  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
  value={formData.password}
  onChange={handleInputChange}
/>
      </div>
    </div>

    <button type="submit"
      className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">Submit</button>
  </form>
  </div>
  </div>
  )
}


export default OfficerReg