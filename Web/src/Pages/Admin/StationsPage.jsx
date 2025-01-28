import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, IconButton, Tooltip, TextField, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { GeoPoint } from 'firebase/firestore'; // Import GeoPoint
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        toast.success('Station updated successfully!');
      } catch (error) {
        console.error('Error updating station:', error);
        toast.error('Failed to update station. Please try again.');
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
      regex.test(part) ? <span key={index} className="bg-yellow">{part}</span> : part
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
      toast.success('Station added successfully!');
    } catch (error) {
      console.error('Error adding station:', error);
      toast.error('Failed to add station. Please try again.');
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
    <div className="bg-white px-4 pb-4 pt-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1 className="text-2xl font-bold text-center text-black">
          <center>Police Stations</center>
        </h1>
      </strong>
          <div className="flex justify-between mb-2">
            <input
                type="text"
                placeholder="🔎︎  Search"
                className="px-4 py-3.5 bg-white text-black w-fit text-sm border-2 mr-16 border-gray-100 focus:border-blue-500 rounded outline-none"
                value={search}
                onChange={handleSearchChange}
            />
            <button
                className="bg-yellow text-white font-bold px-3 py-1 rounded-md w-fit"
                onClick={handleAddClick}
            >
                Add New Station
            </button>
          </div>
          <table className="w-full table-auto">
            <thead className="bg-gray-100 border-gray-400 font-semibold">
              <tr>
                <th className="p-3 tracking-wide">Name</th>
                <th className="p-3 tracking-wide">Email</th>
                <th className="p-3 tracking-wide">Address</th>
                <th className="p-3 tracking-wide">Contact Number</th>
                <th className="p-3 tracking-wide">Location</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredStations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No stations found. Try adjusting your search criteria.
                  </td>
                </tr>
              ) : (
                filteredStations.map((station, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-3">{highlightText(station.station_name ?? 'N/A', search)}</td>
                    <td className="p-3">{highlightText(station.email ?? 'N/A', search)}</td>
                    <td className="p-3">{highlightText(station.address ?? 'N/A', search)}</td>
                    <td className="p-3">{highlightText(station.contact_number ?? 'N/A', search)}</td>
                    <td className="p-3">
                      Latitude: {station.location.latitude.toFixed(4)}, Longitude: {station.location.longitude.toFixed(4)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>



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

export default Stations;
