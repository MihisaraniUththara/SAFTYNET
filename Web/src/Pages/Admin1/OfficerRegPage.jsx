import SidebarHeader from './SideBar';
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  MenuItem,
  Snackbar,
  InputAdornment,
  Typography,
  Card,
  Autocomplete,
} from '@mui/material';
import { Person, CreditCard, Label, Home, Email, Lock, DateRange, Phone, Refresh } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure firebase is initialized here
import { useNavigate } from 'react-router-dom';
// import Spinner from '../../components/Spinner';
import emailjs from 'emailjs-com';

// Define the roles for the select field
const roles = ['Traffic', 'OIC', 'OONH'];

const policeStations = [
  "Achchuweli", "Agalawathta", "Agarapathana", "Agbopura", "Ahangama",
  "Ahungalla", "Aiththamalai", "Aiyankulam", "Akkaraipattu", 
  "Akkarayankulam", "Akmeemana", "Akuressa", "Aladeniya", 
  "Alawathugoda", "Alawwa", "Alubomulla", "Aluthgama", 
  "Ambagasdowa", "Ambalangoda", "Ambalanthota", "Ambanpola", 
  "Ampara", "Anamaduwa", "Angulana", "Angunukolapelessa", 
  "Anguruwatota", "Ankumbura", "Anuradhapura", "Arachchikattuwa", 
  "Aralaganwila", "Aranayaka", "Aththanagalla", "Athurigiriya", 
  "Awissawella", "Ayagama", "Badalgama", "Badalkumbura", 
  "Baddegma", "Badulla", "Baduraliya", "Bagawanthalawa", 
  "Bakamuna", "Bakkiella", "Balangoda", "Ballaketuwa",
  "Bambalpitiya", "Bandaragama", "Bandarawela", "Bangama", 
  "Batapola", "Batticaloa", "Beliaththa", "Bemmulla", 
  "Bentota", "Beruwala", "Bibila", "Bingiriya", "Biyagama", 
  "Bluemandal", "BMICH", 

  "Bogahakumbura", "Bogamuwa", "Bogaswewa", "Bokkawala", "Boralesgamuwa",
  "Borella", "Boyawalana", "Bulathkohupitiya", "Bulathsinhala", "Buththala",
  "Central Camp", "Chawakachcheri", "Chawalakade", "Chettikulam", "Chilaw",
  "ChinaBay", "Chunnakam", "Cinnamon Garden", "Colombo Harbour", "Dalada maligawa",
  "Dam Street", "Damana", "Dambagalla", "Dambulla", "Dankotuwa",
  "Danowita", "Daulagala", "Dayagama", "Dedigama", "Dehiaththakandiya",
  "Dehiowita", "Dehiwala", "Deiyandara", "Delft", "Delvita",
  "Delwala", "Dematagoda", "Deniyaya", "Deraniyagala", "Devuolwewa",
  "Dewalegama", "Dharmapuram", "Dikwella", "Dimbulapathana", "Divulapitiya",
  "Diyabeduma", "Diyathalawa", "Dodangoda", "Dompe", "Doratiyawa",
  "Dummalasooriya", "Dungalpitiya", "Echchallmpaththu", "Echchanmkulam", "Egoda Uyana",
  "Eheliyagoda", "Ehatuwewa", "Elapatha", "Ella", "Elpitiya",

  "Embilipitiya", "Enadana", "Enderamulla", "Eppawala", "Erapola",
  "Eravur", "Etampitiya", "Ethagla", "Ethimale", "Foreshore",
  "Fort", "Galagedara", "Galaha", "Galenbidunuwewa", "Galenewa",
  "Galewela", "Galgamuwa", "Galkiriyagama", "Galle", "Galle Harbour",
  "Gampaha", "Gampola", "Gandara", "Ganemulla", "Ginigathhena",
  "Giradurukotte", "Giribawa", "Girilla", "Giriulla", "Godakawela",
  "Gokarella", "Gomarankadawala", "Gonaganara", "Gonapinuwala", "Gothatuwa",
  "Govindupura", "Grandpass", "Habaraduwa", "Habarana", "Hakmana",
  "Haldummulla", "Haliela", "Hambanthota", "Hambanthota Harbour", "Hambegamuwa",
  "Handungamuwa", "Hanguranketha", "Hanwella", "Haputale", "Hasalaka",
  "Hatharaliyadda", "Hatton", "Hemmathagama", "Hettipola", "Hidogama",
  "Highforest", "Hikkaduwa", "Hingurakgoda", "Hiniduma", "Hirana",

  "Homagama", "Horana", "Horowpathana", "Hungama", "Hurigaswewa",
  "Illawali", "Illuppakadawai", "Imaduwa", "Inginiyagala", "Ingiriya",
  "Inguruwatta", "Ipallogama", "Irattaperiyakulam", "Iththapana", "Ja Ela",
  "Jaffna", "Jayapuram", "Kadanegedara", "Kadawatha", "Kadugannawa",
  "Kaduwela", "Kahatagasdigiliya", "Kahathuduwa", "Kahawatta", "Kalawana",
  "Kalawanchikudy", "Kalkudah", "Kalmunai", "Kalpitiya", "Kaltota",
  "Kalutara North", "Kalutara South", "Kamburupitiya", "Kanagarayankulam", "Kananke",
  "Kandaketiya", "Kandana", "Kandapola", "Kandenuwara", "Kandy",
  "Kankasanthurai", "Kantale", "Karadiyanaru", "Karandeniya", "Karandugala",
  "Karthivu", "Karuwalagaswewa", "Katana", "Kataragama", "Kathankudi",
  "Katugastota", "Katunayaka", "Katunayaka Air Port", "Katupotha", "Katuwana",
  "Kawarakkulam", "Kayts", "Kebithigollawa", "Keerthi Bandarapura", "Kegalle",
  "Kekirawa", "Kelaniya", "Kesbawa", "Keselwatta", "Kilinochchi",
  "Kinniya", "Kiribathgoda", "Kiriella", "Kirinda", "Kirindiwela",
  "Kirulapana", "Kithulgala", "Kobeigane", "Kochchikade", "Kodikamam",
  "Kohuwala", "Kokkadicholai", "Kokuwill", "Kollupitiya", "Kolonna",
  "Kopai", "Kosgama", "Kosgoda", "Koslanda", "Kosmodara",
  "Koswatta", "Kotadeniyawa", "Kotahena", "Kotawehera", "Kotawila",

  "Kothmale", "Kottawa", "Kuchchaweli", "Kudaoya", "Kuliyapitiya", "Kumbukgatey", "Kurunegala", 
  "Kuruwita", "Kuttigala", "Laggala", "Lindula", "Liyangahawela", "Lunugala", "Lunugamwehera", 
  "Madampe", "Madolseema", "Madu", "Maduragoda", "Madurankuliya", "Maduwa", "Mahabage", 
  "Mahakalugolla", "Mahakubukkadawala", "Mahaoya", "Maharagama", "Mahawela", "Mahawilachchiya", 
  "Mahiyangane", "Maho", "Makulugaswewa", "Malabe", "Maligawatta", "Malimbada", "Mallavi", 
  "Malsiripura", "Malwathuhiripitiya", "Mamaduwa", "Manampitiya", "Mandaram Nuwara", "Mangalagama", 
  "Manikhinna", "Manippai", "Mankulam", "Mannar", "Maradana", "Maradankadawala", "Maradankerni", 
  "Marawila", "Maskeliya", "Matale", "Matara", "Mathugama", "Mattakuliya", "Mattegoda", "Maturata", 
  "Mawanella", "Mawarala", "Mawathagama", "Medagama", "Medawachchiya", "Medirigiriya", "Meegahathenna", 
  "Meegahawatta", "Meegalewa", "Meegaswewa", "Meepe", "Meetiyagoda", "Middeniya", "Midigama", 
  "Mihijayasewana", "Mihintale", "Millaniya", "Minneriya", "Minuwangoda", "Mirigama",

  "Mirihana", "Modara", "Monaragala", "Moragahahena", "Moragoda", "Moragollagama", 
  "Moratumulla", "Moratuwa", "Morawaka", "Morawewa", "Morontuduwa", "Mount Lavinia", 
  "Mulankavil", "Mullaittivu", "Mulleriyawa", "Mulliyaweli", "Mundalama", "Murunkan", 
  "Mutur", "Nagoda", "Nagollagama", "Nalla", "Nallathanni", "Namunukula", "Nannariya", 
  "Nanuoya", "Narahenpita", "Narammala", "Nattonkaddal", "Naula", "Nawa Kurunduwatta", 
  "Nawagamuwa", "Nawagaththegama", "Nawalapititya", "Nedumkenrini", "Negambo", "Nelliadi", 
  "Neluwa", "Nerukkulam", "Nikaweratiya", "Nilawely", "Nindavur", "Nittambuwa", "Nivithigala", 
  "Nochchiyagama", "Norochcholey", "Nortonbridge", "Norwood", "Nungamuwa", "Nuriya", 
  "Nuwaraeliya", "Oddusudan", "Okewella", "Okkampitiya", "Omantha", "Opanayaka", "Opatha", 
  "Padaviya", "Padiyathalawa", "Padukka", "Palali", "Palei", "Pallakele", "Pallama", 
  "Pallewela", "Palmadulla", "Pamunugama", "Panadura North", "Panadura South", "Panama", 
  "Panamure", "Pannala", "Pansiyagama", "Panwila", "Parasangaswewa",

  "Parayankulam", "Passara", "Pattipola", "Payagala", "Peliyagoda",
  "Perdadeniya", "Periyanilawannai", "Pesale", "Pettah", "Piliyandala",
  "Pindeniya", "Pinnawala", "Pinwatta", "Pitabeddara", "Pitigala",
  "Poddala", "Point Pedro", "Polgahawela", "Polonnaruwa", "Polpithigama",
  "Polpitiya", "Poojapitiya", "Poththapitiya", "Pothuhera", "Pothupitiya",
  "Pothuvil", "Pudalu oya", "Pudukuduiruppu", "Pugoda", "Pulasthipura",
  "Puliyankulam", "Pulmudai", "Punarin", "Pupuressa", "Pussellawa",
  "Puttalam", "Puwarasamkulam", "Raddolugama", "Ragala", "Ragama",
  "Rajangane", "Rakwana", "Rambukkana", "Rangala", "Rasnayakapura",
  "Rathgama", "Rathnapura", "Rattota", "Rideegama", "Rideemaliyadda",
  "Rotumba", "Ruwanwella", "Saindamaruthu", "Saliyawewa", "Samanala wewa",
  "Samanthurai", "Sampoor", "Sandiweli", "Sapugaskanda", "Seeduwa",
  "Serunuwara", "Sewanagala", "Sidambarampuram", "Sigiriya", "Silawathura",
  "Siripagama", "Siripura", "Siyambalanduwa", "Slave Island", "Sooriyakanda",
  "Sooriyapura", "Sooriyawewa", "Sri pura", "Tangalle", "Thalaimannar",

  "Thalamalagama", "Thalangama", "Thalathuoya", "Thalawa", "Thalawakele",
  "Thambalagamuwa", "Thambuttegama", "Thanamalwila", "Thanthirimalaya", "Thebuwana",
  "Theldeniya", "Thelikada", "Thelippalay", "Theripaha", "Thihagoda",
  "Thinniyawala", "Thirappone", "Thirukkovil", "Thissamaharamaya", "Thoduwawa",
  "Trinco Harbour Police", "Trincomalee", "Udamaluwa", "Udappuwa", "Udasirigama",
  "Udawalawa", "Ududumbara", "Udugama", "Udupussellawa", "Uhana",
  "Uilankulam", "Ulukkulam", "Uppuweli", "Uragasmanhandiya", "Urubokka",
  "Uvaparanagama", "Valachchanai", "Vavunathive", "Vavuniya", "Vellavali",
  "Velvatithurai", "Veyangoda", "Wadduwa", "Wadukotte", "Wahalkada",
  "Wakarai", "Walapone", "Walasmulla", "Wan Ela", "Wanathawilluwa",
  "Wanduramba", "Wankala", "Warakagoda", "Warakapola", "Wariyapola",
  "Watawala", "Waththala", "Wattegama", "Wedithalathiu(Adappan)", "Weeragula",
  "Weeraketiya", "Weerambugedara", "Weeravila", "Welagedara", "Welambada",
  "Weligama", "Weligepola", "Welikada", "Welikanda", "Welimada",
  "Welioya", "Welipanna", "Welipannagahamula", "Weliweriya", "Wellampitiya",
  "Wellawa", "Wellawatta", "Wellawaya", "Wennappuwa", "Wewalwatta",
  "Willgamuwa", "Wolfendhal", "Yakkala", "Yakkalamulla", "Yatawatta",
  "Yatiyanthota"


];

// Styled Alert component
const Alert = styled(MuiAlert)(({ theme }) => ({
  '& .MuiAlert-icon': {
    color: theme.palette.info.main,
  },
}));

// Function to generate a random password
const generateRandomPassword = () => {
  const length = 12; // Desired password length
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const OfficerReg = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dob:'',
    nic: '',
    police_id: '',
    station: '',
    phone_no: '',
    role: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedStation, setSelectedStation] = useState(formData.station);
  const [password, setPassword] = useState(formData.password);



  const sendConfirmationEmail = (email, formData) => {
    const templateParams = {
      to_email: email,
      name: formData.name,
      dob: formData.dob,
      nic: formData.nic,
      police_id: formData.police_id,
      phone_no: formData.phone_no,
      role: formData.role,
      station: formData.station,
      email: formData.email,
    };

    emailjs
      .send('service_de7wys9', 'template_n0d2xm9', templateParams, 'mQqoBUo5rMkRO4TrE')
      .then(
        (response) => {
          console.log('Email sent successfully!', response);
          toast.success('Confirmation email sent!');
        },
        (error) => {
          console.error('Error sending email:', error);
          toast.error('Failed to send confirmation email');
        }
      );
  };


  const handleStationChange = (event, newValue) => {
    setSelectedStation(newValue);
    handleChange({ target: { name: 'station', value: newValue } });
  };

   // Handle password change (manual input or programmatically)
   const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);  // Update local state
    handleChange({ target: { name: 'password', value: newValue } });  // Update parent state
  };

  // Generate and set a new password
  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setPassword(newPassword);  // Update local state
    handleChange({ target: { name: 'password', value: newPassword } });  // Update parent state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleChangeNIC = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    let errors = { ...formErrors };
  
    if (name === 'nic') {
      // NIC Validation
      if (value.length === 10) {
        // First 9 digits and last character must be 'v'
        const nicRegex = /^\d{9}v$/;
        if (!nicRegex.test(value)) {
          errors.nic = "NIC must be 9 digits followed by 'v'.";
        } else {
          errors.nic = '';  // Clear error if NIC is valid
        }
      } else if (value.length === 12) {
        // All digits for 12-character NIC
        const nicRegex = /^\d{12}$/;
        if (!nicRegex.test(value)) {
          errors.nic = "NIC must be 12 digits.";
        } else {
          errors.nic = '';  // Clear error if NIC is valid
        }
      } else {
        errors.nic = "NIC must be either 10 or 12 characters.";
      }
    }
  
    // Update the error state
    setFormErrors(errors);
  };
  
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    let errors = { ...formErrors };
  
    if (name === 'email') {
      // Email Validation with regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailRegex.test(value)) {
        errors.email = "Please enter a valid email address.";
      } else {
        errors.email = ''; // Clear error if email is valid
      }
    }
  
    // Update the error state
    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = 'Please fill out this field';
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
        toast.error('You must be logged in to register an officer.');
        return;
      }

      setLoading(true);

      try {
        const currentUser = auth.currentUser;

        if (!currentUser || !currentUser.email) {
          throw new Error('No admin is currently logged in or email is missing');
        }

        const adminEmail = currentUser.email;
        const adminPassword = prompt('Please enter admin password to re-login:');

        if (!adminPassword) {
          toast.error('Admin password is required to proceed');
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        const formDataCopy = {
          ...formData,
          email: formData.email,
          name: formData.name,
          dob: formData.dob,
          nic: formData.nic,
          police_id: formData.police_id,
          phone_no: formData.phone_no,
          role: formData.role,
          station: formData.station,
        };

        delete formDataCopy.password;

        await setDoc(doc(db, 'police', user.uid), {
          ...formDataCopy,
          timestamp: serverTimestamp(),
        });

        toast.success('Registration successful!');

        // Send the confirmation email after successful registration
        sendConfirmationEmail(formData.email, formData);

        await signOut(auth);

        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        toast.success('Admin logged back in');
        setLoading(false);
        navigate('/admin');
      } catch (error) {
        console.error('Error registering an officer: ', error);
        toast.error('Failed to register an officer: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

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
          <h1 className="text-3xl font-bold mb-3">Officer Registration</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <Container
            maxWidth="md"
            sx={{
              mt: 4,
              background: 'white',
              borderRadius: 4,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
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
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    error={!!formErrors.dob}
                    helperText={formErrors.dob}
                    type="date" // Enforces YYYY-MM-DD format
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRange />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="NIC"
                    variant="outlined"
                    fullWidth
                    name="nic"
                    value={formData.nic}
                    onChange={(e) => handleChangeNIC(e)}  // You will handle validation inside this function
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
                    label="Police ID"
                    variant="outlined"
                    fullWidth
                    name="police_id"
                    value={formData.police_id}
                    onChange={handleChange}
                    required
                    error={!!formErrors.police_id}
                    helperText={formErrors.police_id}
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
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="phone_no"
                    type='number'
                    value={formData.phone_no}
                    onChange={handleChange}
                    required
                    error={!!formErrors.phone_no}
                    helperText={formErrors.phone_no}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
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
                  <Autocomplete
                    value={selectedStation}
                    onChange={handleStationChange}
                    options={policeStations}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Station"
                        variant="outlined"
                        fullWidth
                        required
                        name="station"
                        error={!!formErrors.station}
                        helperText={formErrors.station}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Home />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChangeEmail}
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
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Refresh 
                            style={{ cursor: 'pointer' }}
                            onClick={handleGeneratePassword} 
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
                sx={{ width: '100%' }}
              >
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
