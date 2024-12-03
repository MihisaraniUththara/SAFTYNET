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

const Officers = () => {
  const [officers, setOfficers] = useState([]);
  const [search, setSearch] = useState('');

  // New state for edit modal
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  // State for delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [officerToDelete, setOfficerToDelete] = useState(null);

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

  // Filter officers based on search input
  const filteredOfficers = officers.filter((officer) =>
    Object.values(officer).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
    )
  );

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
      regex.test(part) ? <span key={index} className="bg-yellow-200">{part}</span> : part
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
          dob: selectedOfficer.dob,
          nic: selectedOfficer.nic,
          police_id: selectedOfficer.police_id,
          role: selectedOfficer.role,
          station: selectedOfficer.station,
          phone_no: selectedOfficer.phone_no,
          email: selectedOfficer.email,
        });
        fetchOfficerData(); // Re-fetch data after update
        handleEditClose();
      } catch (error) {
        console.error("Error updating officer:", error);
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
      } catch (error) {
        console.error("Error deleting officer:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarHeader />
      <div className="flex-1 flex flex-col overflow-hidden mt-16">
        <header className="text-center">
          <h1 className="text-3xl text-center p-2 font-bold">Registered Officers</h1>
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
                    <TableSortLabel>Date of Birth</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>NIC</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Police ID</TableSortLabel>
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
                        {highlightText(officer.dob || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.nic || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.police_id || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.role || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.station || 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(officer.phone_no || 'N/A', search)}
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
            value={selectedOfficer?.phone_no || ''}
            onChange={(e) => setSelectedOfficer({ ...selectedOfficer, phone_no: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Police ID"
            value={selectedOfficer?.police_id || ''}
            onChange={(e) => setSelectedOfficer({ ...selectedOfficer, police_id: e.target.value })}
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
    </div>
  );
};

export default Officers;
