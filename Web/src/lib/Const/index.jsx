import {HiOutlineViewGrid} from 'react-icons/hi'
import { MdEditNote } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import { FaListCheck } from "react-icons/fa6";
import { FaChartLine, FaHourglassHalf, FaInfoCircle, FaUserShield} from 'react-icons/fa'; //usersheild-officers/dutylist of oic
    

export const DASHBOARD_SIDEBAR_LINKS_TRAFFIC = [
	{
		key: 'T-dashboard',
		label: 'Dashboard',
		path: '/Traffic',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'T-accident-on-progress',
		label: 'Accident On Progress',
		path: '/Traffic/AccidentProgress',
		icon: <FaHourglassHalf />
	},
	{
		key: 'T-accident-details',
		label: 'Accident Details',
		path: '/Traffic/AccidentDetails',
		icon: <FaInfoCircle />
	},
	{
		key: 'T-report',
		label: 'Report',
		path: '/Traffic/Report',
		icon: <MdEditNote />
	},
	{
		key: 'T-analysis',
		label: 'Analysis',
		path: '/Traffic/Analysis',
		icon: <FaChartLine />
	}
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]


export const DASHBOARD_SIDEBAR_LINKS_OIC = [
	{
		key: 'O-dashboard',
		label: 'Dashboard',
		path: '/Oic',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'O-accident-on-progress',
		label: 'Accident On Progress',
		path: '/Oic/AccidentProgress',
		icon: <FaHourglassHalf />
	},
	{
		key: 'O-accident-details',
		label: 'Accident Details',
		path: '/Oic/AccidentDetails',
		icon: <FaInfoCircle />
	},
	{
		key: 'o-ReportApp',
		label: 'Report Approval',
		path: '/Oic/ReportApproval',
		icon: <TbReportSearch />
	},
	{
		key: 'o-duty',
		label: 'Duty List',
		path: '/Oic/Duty',
		icon: <FaListCheck />
	},
	{
		key: 'O-report',
		label: 'Report',
		path: '/Oic/Report',
		icon: <MdEditNote />
	},
	{
		key: 'O-analysis',
		label: 'Analysis',
		path: '',
		icon: <FaChartLine />
	},
	
]



export const DASHBOARD_SIDEBAR_LINKS_HEAD = [
	{
		key: 'H-dashboard',
		label: 'Dashboard',
		path: '/Head',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'H-accident-on-progress',
		label: 'Accident On Progress',
		path: '/Head/AccidentProgress',
		icon: <FaHourglassHalf />
	},
	{
		key: 'H-accident-details',
		label: 'Accident Details',
		path: '/Head/AccidentDetails',
		icon: <FaInfoCircle />
	},
	{
		key: 'H-ReportSub',
		label: 'Report Submission',
		path: '/Head/ReportSubmit',
		icon: <SiTicktick />
	},
	{
		key: 'H-report',
		label: 'Report',
		path: '/Head/Report',
		icon: <MdEditNote />
	},
	{
		key: 'H-analysis',
		label: 'Analysis',
		path: '/Head/Analysis',
		icon: <FaChartLine />
	},
	
]

export const DASHBOARD_SIDEBAR_LINKS_ADMIN = [
	{
		key: 'A-dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'Register-Officer',
		label: 'Register Officer',
		path: '/admin/officerReg',
		icon: <FaHourglassHalf />
	},
	{
		key: 'officer',
		label: 'Officer',
		path: '/admin/officers',
		icon: <FaInfoCircle />
	},
	{
		key: 'driver',
		label: 'Driver',
		path: '/admin/drivers',
		icon: <TbReportSearch />
	},
	{
		key: 'station',
		label: 'Station',
		path: '/admin/stations',
		icon: <FaListCheck />
	},
	
	
]

export const SUBMENU_LINKS_TRAFFIC = [
	{
		key: 'T-all',
		label: 'ALL',
		path: '/Traffic/AccidentProgress',
	},
	{
		key: 'T-myCases',
		label: 'MY CASES',
		path: '/Traffic/AccidentProgress/mycases',
	},
	{
		key: 'T-reject',
		label: 'REJECTED',
		path: '/Traffic/AccidentProgress/Reject',
	}
	
]

export const SUBMENU_LINKS_DUTY = [
	{
		key: 'Duty',
		label: 'TODAY SHIFT',
		path: '/Oic/Duty',
	},
	{
		key: 'Day',
		label: 'DAY SHIFT',
		path: '/Oic/Duty/Day',
	},
	{
		key: 'Night',
		label: 'NIGHT SHIFT',
		path: '/Oic/Duty/Night',
	},
	
]
