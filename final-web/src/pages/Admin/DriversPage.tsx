import SidebarHeader from './SideBar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, IconButton, Tooltip, TextField, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';


interface DriverData {
  id: string;
  fullName: string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  driverLicense: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}

const Drivers = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [search, setSearch] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(null);
  const [driverToDelete, setDriverToDelete] = useState<DriverData | null>(null);

  // Fetch driver data from Firestore
  const fetchDriverData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'drivers'));
      const driverData: DriverData[] = [];
      querySnapshot.forEach((doc) => {
        driverData.push({
          id: doc.id,
          ...doc.data(),
        } as DriverData);
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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  // Function to highlight text in a string
  const highlightText = (text: string | undefined, search: string) => {
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
  const handleEditOpen = (driver: DriverData) => {
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
  const handleDeleteOpen = (driver: DriverData) => {
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
    <div className="flex h-screen">
      <SidebarHeader />
      <div className="flex-1 flex flex-col overflow-hidden mt-16">
        <header className="text-center">
          <h1 className="text-3xl text-center p-2 font-bold">Registered Drivers</h1>
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
                    <TableSortLabel>Full Name</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Email</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>National ID Number</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Driving License Number</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Phone Number</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Emergency Contact Name</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Emergency Contact Number</TableSortLabel>
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
                  margin="dense"
                  label="Full Name"
                  fullWidth
                  value={selectedDriver.fullName}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, fullName: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Email"
                  fullWidth
                  value={selectedDriver.email}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, email: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="National ID"
                  fullWidth
                  value={selectedDriver.nationalId}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, nationalId: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Phone Number"
                  fullWidth
                  value={selectedDriver.phoneNumber}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, phoneNumber: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Driver License"
                  fullWidth
                  value={selectedDriver.driverLicense}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, driverLicense: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Emergency Contact Name"
                  fullWidth
                  value={selectedDriver.emergencyContactName}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, emergencyContactName: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Emergency Contact Number"
                  fullWidth
                  value={selectedDriver.emergencyContactNumber}
                  onChange={(e) =>
                    setSelectedDriver((prev) => prev && { ...prev, emergencyContactNumber: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={updateDriver} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Delete Confirmation Dialog */}
          {driverToDelete && (
            <Dialog open={deleteConfirmOpen} onClose={handleDeleteClose}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                Are you sure you want to delete this driver?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={deleteDriver} color="error">
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
