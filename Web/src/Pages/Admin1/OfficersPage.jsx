import SidebarHeader from './SideBar';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, IconButton, Tooltip, TextField, InputAdornment, Dialog,
  DialogActions, DialogContent, DialogTitle, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SideBarAdmin from '../../Components/SideBarAdmin';
import Header from '../../Components/Admin/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Officers = () => {
  const [officers, setOfficers] = useState([]);
  const [search, setSearch] = useState('');

  // New state for edit modal
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  // State for delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [officerToDelete, setOfficerToDelete] = useState(null);

  const [columnSearch, setColumnSearch] = useState({
    name: '',
    nic: '',
    badgeNumber: '',
    role: '',
    station: '',
    phoneNumber: '',
    email: ''
  });

  // Fetch officer data from Firestore
  const fetchOfficerData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'police'));
      const officerData = [];
      querySnapshot.forEach((doc) => {
        officerData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setOfficers(officerData);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    fetchOfficerData();
  }, []);

  const handleColumnSearchChange = (e, column) => {
    setColumnSearch({ ...columnSearch, [column]: e.target.value });
  };

  // Filter officers based on search input
  const filteredOfficers = officers.filter((officer) => {
    // Global search: Matches any field against the global `search` input
    const globalMatch = Object.values(officer).some((value) =>
      value?.toString().toLowerCase().includes(search.trim().toLowerCase())
    );
  
    // Column search: Matches each column search input against corresponding fields
    const columnMatch = Object.keys(columnSearch).every((key) => {
      const columnValue = columnSearch[key].trim().toLowerCase();
      if (!columnValue) return true; // If no column search value, consider it a match
      return officer[key]?.toString().toLowerCase().includes(columnValue);
    });
  
    // Return true only if both global and column searches match
    return globalMatch && columnMatch;
  });
  

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Function to highlight text in a string
  const highlightText = (text, search) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!search.trim()) return text;

    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} className="bg-yellow">{part}</span> : part
    );
  };

  // Edit modal handlers
  const handleEditOpen = (officer) => {
    setSelectedOfficer(officer);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedOfficer(null);
    setEditOpen(false);
  };

  // Update officer in Firestore
  const updateOfficer = async () => {
    if (selectedOfficer) {
      try {
        await updateDoc(doc(db, 'police', selectedOfficer.id), {
          name: selectedOfficer.name,
          nic: selectedOfficer.nic,
          badgeNumber: selectedOfficer.badgeNumber,
          role: selectedOfficer.role,
          station: selectedOfficer.station,
          phoneNumber: selectedOfficer.phoneNumber,
          email: selectedOfficer.email,
        });
        fetchOfficerData(); // Re-fetch data after update
        handleEditClose();
        toast.success('Officer updated successfully'); // Success toast
      } catch (error) {
        console.error("Error updating officer:", error);
        toast.error('Failed to update officer'); // Error toast
      }
    }
  };

  // Delete confirmation handlers
  const handleDeleteClick = (id) => {
    setOfficerToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteClose = () => {
    setOfficerToDelete(null);
    setDeleteConfirmOpen(false);
  };

  // Delete officer from Firestore
  const deleteOfficer = async () => {
    if (officerToDelete) {
      try {
        await deleteDoc(doc(db, 'police', officerToDelete));
        fetchOfficerData();  // Re-fetch data after delete
        handleDeleteClose();
        toast.success('Officer deleted successfully'); // Success toast
      } catch (error) {
        console.error("Error deleting officer:", error);
        toast.error('Failed to delete officer'); // Error toast
      }
    }
  };

  return (
    <div className="flex h-screen bg-neutral-100 w-screen overflow-hidden">
    <SideBarAdmin />
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
          <h1 className="text-3xl text-black text-center p-2 font-bold">Registered Officers</h1>

        <main className="flex-1 overflow-auto p-4 flex-col">
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
                    <TableSortLabel>NIC</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Badge No</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Role</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Station</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Phone No</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Email</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">Actions</TableCell>
                </TableRow>

                <TableRow className="bg-gray-100 border-r border-gray-300">
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search name"
                      value={columnSearch.name}
                      onChange={(e) => handleColumnSearchChange(e, 'name')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search NIC"
                      value={columnSearch.nationalId}
                      onChange={(e) => handleColumnSearchChange(e, 'nic')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search police ID"
                      value={columnSearch.badgeNumber}
                      onChange={(e) => handleColumnSearchChange(e, 'badgeNumber')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search role"
                      value={columnSearch.role}
                      onChange={(e) => handleColumnSearchChange(e, 'role')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search station"
                      value={columnSearch.station}
                      onChange={(e) => handleColumnSearchChange(e, 'station')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search phone no"
                      value={columnSearch.phoneNumber}
                      onChange={(e) => handleColumnSearchChange(e, 'phoneNumber')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search email"
                      value={columnSearch.email}
                      onChange={(e) => handleColumnSearchChange(e, 'email')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOfficers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No officers found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOfficers.map((officer, index) => (
                    <TableRow key={index} className="border-b border-gray-300">
                      <TableCell className="border-r border-l border-gray-300">
                        {highlightText(officer.name || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.nic || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.badgeNumber || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.role || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.station || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.phoneNumber || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.email || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        <Tooltip title="Edit">
                          <IconButton color="primary" sx={{ mr: 1 }} onClick={() => handleEditOpen(officer)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDeleteClick(officer.id)}>
                            <Delete />
                          </IconButton>
                        </Tooltip> */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </div>
      </div>
      

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Officer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Role"
            value={selectedOfficer?.role || ''}
            onChange={(e) => setSelectedOfficer({ ...selectedOfficer, role: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Station"
            value={selectedOfficer?.station || ''}
            onChange={(e) => setSelectedOfficer({ ...selectedOfficer, station: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone Number"
            value={selectedOfficer?.phoneNumber || ''}
            onChange={(e) => setSelectedOfficer({ ...selectedOfficer, phoneNumber: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Police ID"
            value={selectedOfficer?.badgeNumber || ''}
            onChange={(e) => setSelectedOfficer({ ...selectedOfficer, badgeNumber: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateOfficer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this officer?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
          <Button onClick={deleteOfficer} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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

export default Officers;
