import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, IconButton, Tooltip, TextField, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverToDelete, setDriverToDelete] = useState(null);

  const [columnSearch, setColumnSearch] = useState({
    fullName: '',
    email: '',
    nationalId: '',
    driverLicense: '',
    phoneNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
  });
  

  // Fetch driver data from Firestore
  const fetchDriverData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'drivers'));
      const driverData = [];
      querySnapshot.forEach((doc) => {
        driverData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDrivers(driverData);
      // toast.success('Drivers loaded successfully!');
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Failed to load drivers.');
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleColumnSearchChange = (e, column) => {
    setColumnSearch({ ...columnSearch, [column]: e.target.value });
  };

  const filteredDrivers = drivers.filter((driver) => {
    const globalMatch = Object.values(driver).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    );
  
    const columnMatch = Object.keys(columnSearch).every((key) =>
      driver[key]?.toString().toLowerCase().includes(columnSearch[key].toLowerCase())
    );
  
    return globalMatch && columnMatch;
  });
  
  
  // Function to highlight text in a string
  const highlightText = (text, search) => {
    if (!text || typeof text !== 'string') return text || ''; // Handle undefined or non-string values
    if (!search.trim()) return text;

    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} className="bg-yellow">{part}</span> : part
    );
  };

  // Open Edit Modal
  const handleEditOpen = (driver) => {
    setSelectedDriver(driver);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedDriver(null);
  };

  // Update driver data in Firestore
  const updateDriver = async () => {
    if (selectedDriver) {
      try {
        const driverDocRef = doc(db, 'drivers', selectedDriver.id);
        await updateDoc(driverDocRef, {
          fullName: selectedDriver.fullName,
          nationalId: selectedDriver.nationalId,
          phoneNumber: selectedDriver.phoneNumber,
          email: selectedDriver.email,
          driverLicense: selectedDriver.driverLicense,
          emergencyContactName: selectedDriver.emergencyContactName,
          emergencyContactNumber: selectedDriver.emergencyContactNumber,
        });
        fetchDriverData(); // Refresh the driver list
        handleEditClose();
        toast.success('Driver updated successfully!');
      } catch (error) {
        console.error('Error updating driver:', error);
        toast.error('Failed to update driver.');
      }
    }
  };
  

  // Open Delete Confirmation Modal
  const handleDeleteOpen = (driver) => {
    setDriverToDelete(driver);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
    setDriverToDelete(null);
  };

  // Delete driver from Firestore
  const deleteDriver = async () => {
    if (driverToDelete) {
      try {
        const driverDocRef = doc(db, 'drivers', driverToDelete.id);
        await deleteDoc(driverDocRef);
        fetchDriverData(); // Refresh the driver list
        handleDeleteClose();
        toast.success('Driver deleted successfully!');
      } catch (error) {
        console.error('Error deleting driver:', error);
        toast.error('Failed to delete driver.');
      }
    }
  };
  

  return (
    <div className="bg-white px-4 pb-4 pt-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1 className="text-2xl font-bold text-center text-black">
          <center>Driver Details</center>
        </h1>
      </strong>

          {/* <div className="flex justify-end mb-2">
            <div className="relative flex items-center justify-end">
                <input
                  type="text"
                  variant="outlined"
                  size="small"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search🔍"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                />
            </div>
          </div> */}
          <div className="mt-3 p-3">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 border-gray-400 font-semibold">
                <tr>
                  <th className="p-3 tracking-wide">Name</th>
                  <th className="p-3 tracking-wide">Email</th>
                  <th className="p-3 tracking-wide">NIC</th>
                  <th className="p-3 tracking-wide">Driving License No</th>
                  <th className="p-3 tracking-wide">Phone No</th>
                  <th className="p-3 tracking-wide">Emergency Contact Name</th>
                  <th className="p-3 tracking-wide">Emergency Contact No</th>
                  <th className="p-3 tracking-wide">Actions</th>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">
                    <input
                        type="text"
                        placeholder="🔎︎  Search"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        value={columnSearch.fullName}
                        onChange={(e) => handleColumnSearchChange(e, 'fullName')}
                    />
                  </td>
                  <td className="p-2">
                    <input
                        type="text"
                        placeholder="🔎︎  Search"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        value={columnSearch.email}
                        onChange={(e) => handleColumnSearchChange(e, 'email')}
                    /> 
                  </td>
                  <td className="p-2">
                    <input
                        type="text"
                        placeholder="🔎︎  Search"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        value={columnSearch.nationalId}
                        onChange={(e) => handleColumnSearchChange(e, 'nationalId')}
                      />
                  </td>
                  <td className="p-2">
                    <input
                        type="text"
                        placeholder="🔎︎  Search"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        value={columnSearch.driverLicense}
                        onChange={(e) => handleColumnSearchChange(e, 'driverLicense')}
                    />
                  </td>
                  <td className="p-2">
                    <input
                        type="text"
                        placeholder="🔎︎  Search"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        value={columnSearch.phoneNumber}
                        onChange={(e) => handleColumnSearchChange(e, 'phoneNumber')}
                      />
                  </td>
                  <td className="p-2">
                    <input
                        type="text"
                        placeholder="🔎︎  Search"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        value={columnSearch.emergencyContactName}
                        onChange={(e) => handleColumnSearchChange(e, 'emergencyContactName')}
                      />
                  </td>
                  <td className="p-2">
                    <input
                          type="text"
                          placeholder="🔎︎  Search"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          value={columnSearch.emergencyContactNumber}
                          onChange={(e) => handleColumnSearchChange(e, 'emergencyContactNumber')}
                      />
                  </td>
                  <td />
                </tr>


              </thead>
              <tbody className="text-center">
                {filteredDrivers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      No drivers found. Try adjusting your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDrivers.map((driver, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="p-3">{highlightText(driver.fullName ?? 'N/A', search)}</td>
                      <td className="p-3">{highlightText(driver.email ?? 'N/A', search)}</td>
                      <td className="p-3">{highlightText(driver.nationalId ?? 'N/A', search)}</td>
                      <td className="p-3">{highlightText(driver.driverLicense ?? 'N/A', search)}</td>
                      <td className="p-3">{highlightText(driver.phoneNumber ?? 'N/A', search)}</td>
                      <td className="p-3">{highlightText(driver.emergencyContactName ?? 'N/A', search)}</td>
                      <td className="p-3">{highlightText(driver.emergencyContactNumber ?? 'N/A', search)}</td>
                      <td className="p-3 flex gap-2 justify-center">
                        <button
                          className="bg-yellow-button text-white px-3 py-1 rounded-md flex items-center gap-2"
                          onClick={() => handleEditOpen(driver)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2"
                          onClick={() => handleDeleteOpen(driver)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>


          {/* Edit Driver Dialog */}
          {selectedDriver && (
            <Dialog open={editOpen} onClose={handleEditClose}>
              <DialogTitle>Edit Driver</DialogTitle>
              <DialogContent>
                <TextField
                  label="Email"
                  value={selectedDriver.email || ''}
                  onChange={(e) =>
                    setSelectedDriver({ ...selectedDriver, email: e.target.value })
                  }
                  fullWidth
                  sx={{ mt:1,  mb: 2 }}
                />
                <TextField
                  label="Phone Number"
                  value={selectedDriver.phoneNumber || ''}
                  onChange={(e) =>
                    setSelectedDriver({ ...selectedDriver, phoneNumber: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Emergency Contact Name"
                  value={selectedDriver.emergencyContactName || ''}
                  onChange={(e) =>
                    setSelectedDriver({
                      ...selectedDriver,
                      emergencyContactName: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Emergency Contact Number"
                  value={selectedDriver.emergencyContactNumber || ''}
                  onChange={(e) =>
                    setSelectedDriver({
                      ...selectedDriver,
                      emergencyContactNumber: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={updateDriver} color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Delete Confirmation Dialog */}
          {driverToDelete && (
            <Dialog open={deleteConfirmOpen} onClose={handleDeleteClose}>
              <DialogTitle>Delete Driver</DialogTitle>
              <DialogContent>
                Are you sure you want to delete this driver?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={deleteDriver}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}
        
      
      
      

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </div>
  );
};

export default Drivers;
