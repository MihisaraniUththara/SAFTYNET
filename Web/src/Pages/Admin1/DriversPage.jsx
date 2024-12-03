import SidebarHeader from './SideBar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import SideBarAdmin from '../../Components/SideBarAdmin';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverToDelete, setDriverToDelete] = useState(null);

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
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Function to highlight text in a string
  const highlightText = (text, search) => {
    if (!text || typeof text !== 'string') return text || ''; // Handle undefined or non-string values
    if (!search.trim()) return text;

    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} className="bg-yellow-200">{part}</span> : part
    );
  };

  // Filter drivers based on search input
  const filteredDrivers = drivers.filter((driver) =>
    Object.values(driver).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

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
      const driverDocRef = doc(db, 'drivers', driverToDelete.id);
      await deleteDoc(driverDocRef);
      fetchDriverData(); // Refresh the driver list
      handleDeleteClose();
    }
  };

  return (
    <div className="flex h-screen w-screen bg-neutral-100">
      <SideBarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden mt-16">
        <header className="text-center">
          <h1 className="text-3xl text-black text-center p-2 font-bold">Registered Drivers</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="flex justify-end mb-2">
            <TextField
              variant="outlined"
              size="small"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'gray.500' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: '#fdfdfd',
                borderRadius: '8px',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'gray.500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </div>
          <TableContainer component={Paper} sx={{ padding: 4, background: '#fdfdfd' }}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-200 text-gray-700 border-b-2 border-gray-300">
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Name</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Email</TableSortLabel>
                  </TableCell>      
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>NIC</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Driving License No</TableSortLabel> 
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Phone No</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Emergency Contact Name</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Emergency Contact No</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDrivers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No drivers found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDrivers.map((driver, index) => (
                    <TableRow key={index} className="border-b border-gray-300">
                      <TableCell className="border-r border-l border-gray-300">
                        {highlightText(driver.fullName ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(driver.email ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(driver.nationalId ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(driver.driverLicense ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(driver.phoneNumber ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(driver.emergencyContactName ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(driver.emergencyContactNumber ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        <Tooltip title="Edit">
                          <IconButton color="primary" sx={{ mr: 1 }} onClick={() => handleEditOpen(driver)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDeleteOpen(driver)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

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
        </main>
      </div>
    </div>
  );
};

export default Drivers;
