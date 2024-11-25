import SidebarHeader from './SideBar';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Container, MenuItem, Snackbar, InputAdornment, Typography } from '@mui/material';
import { Person, CreditCard, Label, Home, Email, Lock } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Ensure firebase is initialized here
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

// Define the type for the form data state
interface FormData {
  name: string;
  nic: string;
  role: string;
  station: string;
  email: string;
  password: string;
}

const roles = ['Traffic', 'OIC', 'Other'];

// Styled Alert component
const Alert = styled(MuiAlert)<AlertProps>(({ theme }) => ({
  '& .MuiAlert-icon': {
    color: theme.palette.info.main,
  },
}));

const OfficerReg: React.FC = () => {
  // Define the initial state for form data and errors
  const auth = getAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    nic: '',
    role: '',
    station: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  // Handle changes in the form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: Partial<FormData> = {};
    for (const key in formData) {
      if (!formData[key as keyof FormData]) {
        errors[key as keyof FormData] = 'Please fill out this field';
      }
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setSnackbarMessage('Please fill out all fields!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } else {

    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to register an officer.");
      return;
    }

    setLoading(true);

  try {
    // Get the currently logged-in admin user
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error("No admin is currently logged in or email is missing");
    }

    // Save admin credentials (email and prompt for password to re-login later)
    const adminEmail = currentUser.email;
    const adminPassword = prompt("Please enter admin password to re-login:");

    if (!adminPassword) {
      toast.error("Admin password is required to proceed");
      return;
    }
        // Create a new officer with formData (officer email and password)
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    
    // Prepare form data for Firestore
    const formDataCopy: any = {
      ...formData,
        email: formData.email, 
        name: formData.name, 
        nic: formData.nic,
        role: formData.role,
        station: formData.station,
    };
    
    // Remove password from the copy
    delete (formDataCopy as any).password;
    
    
    // Save additional officer details in Firestore
    await setDoc(doc(db, "police", user.uid), {
      ...formDataCopy,
      timestamp: serverTimestamp(),
    });
    toast.success("Registration successful!");


    // Immediately sign out the officer after registration
    await signOut(auth);

    // Re-sign in the admin using the saved credentials
    await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log("Admin logged back in");
    toast.success("Admin logged back in");
    setLoading(false);
    navigate(`/admin`);
    } catch (error) {
      console.error("Error registering an officer: ", error);
      toast.error("Failed to register an officer: " + error);
    } finally {
      setLoading(false);
    }
    }
  };

  // Handle closing of the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen">
      <SidebarHeader />
      <div className="flex-1 flex flex-col overflow-y-auto mt-16">
        <header className="text-center mt-4">
          <h1 className="text-3xl text-center mt-0 font-bold mb-3">Officer Registration</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <Container maxWidth="md" sx={{ mt: 4, background: 'bg-white', borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="National ID Number"
                    variant="outlined"
                    fullWidth
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                    error={!!formErrors.nic}
                    helperText={formErrors.nic}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Role"
                    variant="outlined"
                    fullWidth
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    error={!!formErrors.role}
                    helperText={formErrors.role}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Label />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Station"
                    variant="outlined"
                    fullWidth
                    name="station"
                    value={formData.station}
                    onChange={handleChange}
                    required
                    error={!!formErrors.station}
                    helperText={formErrors.station}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                </Grid>
                <Grid item xs={1}>
                </Grid>
              </Grid>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default OfficerReg;
