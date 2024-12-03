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
import { Edit, Delete, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { GeoPoint } from 'firebase/firestore'; // Import GeoPoint

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStation, setCurrentStation] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStation, setNewStation] = useState({
    id: '',
    station_name: '',
    address: '',
    contact_number: '',
    location: new GeoPoint(0, 0), // Initialize with default values
    email: '',
    password: '',
  });

  // Fetch station data from Firestore
  const fetchStationData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'police_stations'));
      const stationData = [];
      querySnapshot.forEach((doc) => {
        stationData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStations(stationData);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  useEffect(() => {
    fetchStationData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle Edit Button Click
  const handleEditClick = (station) => {
    setCurrentStation(station);
    setEditDialogOpen(true);
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    if (currentStation) {
      try {
        const stationDocRef = doc(db, 'police_stations', currentStation.id);
        await updateDoc(stationDocRef, { password: newPassword });
        setEditDialogOpen(false);
        fetchStationData(); // Refresh data
      } catch (error) {
        console.error('Error updating station:', error);
      }
    }
  };

  // Handle Dialog Close
  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentStation(null);
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

  // Filter stations based on search input
  const filteredStations = stations.filter((station) =>
    Object.values(station).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  // Handle Add Button Click
  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  // Handle Add Station Save
  const handleAddStation = async () => {
    try {
      const stationRef = collection(db, 'police_stations');
      await addDoc(stationRef, {
        ...newStation,
        location: new GeoPoint(newStation.location.latitude, newStation.location.longitude),
      });
      setAddDialogOpen(false);
      fetchStationData(); // Refresh data
    } catch (error) {
      console.error('Error adding station:', error);
    }
  };

  // Handle Location Input Change
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewStation({
      ...newStation,
      location: new GeoPoint(
        name === 'latitude' ? parseFloat(value) : newStation.location.latitude,
        name === 'longitude' ? parseFloat(value) : newStation.location.longitude
      )
    });
  };

  return (
    <div className="flex h-screen">
      <SidebarHeader />
      <div className="flex-1 flex flex-col overflow-hidden mt-16">
        <header className="text-center">
          <h1 className="text-3xl text-center p-2 font-bold">Police Stations</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddClick}
              sx={{ marginRight: 2 }}
            >
              Add Station
            </Button>
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
                    <TableSortLabel>Address</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Contact Number</TableSortLabel>
                  </TableCell>
                  <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Location</TableSortLabel>
                  </TableCell>
                  {/* <TableCell className="border-r border-b-0 border-gray-300">
                    <TableSortLabel>Password</TableSortLabel>
                  </TableCell> */}
                  {/* <TableCell className="border-r border-b-0 border-gray-300">Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No stations found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStations.map((station, index) => (
                    <TableRow key={index} className="border-b border-gray-300">
                      <TableCell className="border-r border-l border-gray-300">
                        {highlightText(station.station_name ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(station.email ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(station.address ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {highlightText(station.contact_number ?? 'N/A', search)}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        Latitude: {station.location.latitude.toFixed(4)}, Longitude: {station.location.longitude.toFixed(4)}
                      </TableCell>
                      {/* <TableCell className="border-r border-gray-300">
                        {station.password}
                      </TableCell> */}
                      {/* <TableCell className="border-r border-gray-300">
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(station)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </main>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Edit Station</DialogTitle>
          <DialogContent>
            <TextField
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogActions>
        </Dialog>

        {/* Add Dialog */}
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
          <DialogTitle>Add New Station</DialogTitle>
          <DialogContent>
            <TextField
              label="Station Name"
              value={newStation.station_name}
              onChange={(e) => setNewStation({ ...newStation, station_name: e.target.value })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Address"
              value={newStation.address}
              onChange={(e) => setNewStation({ ...newStation, address: e.target.value })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Contact Number"
              value={newStation.contact_number}
              onChange={(e) => setNewStation({ ...newStation, contact_number: e.target.value })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              value={newStation.email}
              onChange={(e) => setNewStation({ ...newStation, email: e.target.value })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Latitude"
              value={newStation.location.latitude}
              onChange={handleLocationChange}
              name="latitude"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Longitude"
              value={newStation.location.longitude}
              onChange={handleLocationChange}
              name="longitude"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              value={newStation.password}
              onChange={(e) => setNewStation({ ...newStation, password: e.target.value })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddStation}>Add Station</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Stations;
