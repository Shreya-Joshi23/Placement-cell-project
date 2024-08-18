import React, { useEffect, useState } from "react";
import CompanyInfo from "./CompanyInfo";

// Firebase imports
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { format } from "date-fns";

// mui imports
import {
  Chip,
  Grid,
  Typography,
  Box,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import MyInfo from "../../components/MyInfo";
import { toast } from "react-hot-toast";

const MyCompanies = ({ currUser, myinfo }) => {
  const [tabPage, setTabPage] = useState("1");
  const [companydata, setcompanydata] = useState([]);
  const [filteredcompanies, setfilteredcompanies] = useState([]);
  const [pageSize, setPageSize] = useState("");
  const [applications, setApplications] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  // console.log(currUser)

  useEffect(() => {
    const q = query(collection(db, "companies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), key: doc.id };
        appointments.push(data);
      });
      setcompanydata(appointments);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const fetchApplications = async () => {
    if (currUser && currUser.uid) {
      const q = query(
        collection(db, "applications"),
        where("studentID", "==", currUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const apps = [];
      querySnapshot.forEach((doc) => {
        apps.push(doc.data());
      });
      setApplications(apps);
    }
  }
  
  useEffect(() => {
    fetchApplications();
  });

  useEffect(() => {
    let index = 1;
    const tempArr = companydata.reduce((result, data) => {
      switch (tabPage) {
        case "2":
          const appliedStatus = applications.some(
            (app) =>
              app.companyID === data.key &&
              app.studentID === currUser.uid &&
              app.interviewStatus === "Pending" &&
              app.placementStatus === "Pending"
          );
          if (!appliedStatus) return result;
          break;
        case "3":
          const hasScheduledInterview = applications.some(
            (app) =>
              app.companyID === data.key &&
              app.studentID === currUser.uid &&
              app.interviewStatus === "Scheduled"
          );
          if (!hasScheduledInterview) return result;
          break;
        case "4":
          const placedStatus = applications.some(
            (app) =>
              app.companyID === data.key &&
              app.studentID === currUser.uid &&
              app.placementStatus === "Placed"
          );
          if (!placedStatus) return result;
          break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);
    setfilteredcompanies(tempArr);
  }, [companydata, tabPage, applications, currUser]);

  const handleApply = (companyID) => {
    const company = companydata.find((c) => c.key === companyID);
    setSelectedCompany(company);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCompany(null);
  };

  const handleSubmitApplication = async () => {
    try {
      await addDoc(collection(db, "applications"), {
        studentID: currUser.uid,
        companyID: selectedCompany.key,
        jobRole: selectedCompany.jobRole,
        applicationDate: new Date().toISOString(),
        interviewStatus: "Pending",
        placementStatus: "Pending",
      });
      await fetchApplications();
      toast.success("Application submitted successfully!");
      handleDialogClose();
    } catch (error) {
      console.error("Error applying to company: ", error);
      toast.error("Failed to submit application.");
    }
  };

  const columns = [
    { field: "cid", headerName: "Sr No.", type: "number", width: 60 },
    {
      field: "companyName",
      headerName: "CompanyName",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "jobRole",
      headerName: "jobRole",
      width: 150,
      renderCell: renderCellExpand,
    },
    {
      field: "companyStatus",
      headerName: "Status",
      sortable: false,
      width: 110,
      renderCell: (params) => {
        const isApplied = applications.some(
          (app) =>
            app.companyID === params.row.key &&
            app.studentID === currUser.uid &&
            app.interviewStatus === "Pending" &&
            app.placementStatus === "Pending"
        );
        const isInterview = applications.some(
          (app) =>
            app.companyID === params.row.key &&
            app.studentID === currUser.uid &&
            app.interviewStatus === "Scheduled"
        );
        const isPlaced = applications.some(
          (app) =>
            app.companyID === params.row.key &&
            app.studentID === currUser.uid &&
            app.placementStatus === "Placed"
        );
        return (
          <>
            {isPlaced ? (
              <Chip label="Placed" color="success" />
            ) : isInterview ? (
              <Chip label="Interview" color="secondary" />
            ) : isApplied ? (
              <Chip label="Applied" color="primary" />
            ) : (
              <Chip label="Apply" onClick={() => handleApply(params.row.key)} />
            )}
          </>
        );
      },
    },
    ...(tabPage === "3"
      ? [
          {
            field: "interviewDateTime",
            headerName: "Interview Date & Time",
            width: 200,
            renderCell: (params) => {
              const application = applications.find(
                (app) =>
                  app.companyID === params.row.key &&
                  app.studentID === currUser.uid &&
                  app.interviewStatus === "Scheduled"
              );
              if (application && application.interviewDateTime) {
                const interviewDate = application.interviewDateTime.toDate();
                return (
                  <Typography variant="body2">
                    {format(interviewDate, "PPpp")}
                  </Typography>
                );
              }
              return <Typography variant="body2">N/A</Typography>;
            },
          },
        ]
      : []),
    {
      field: "description",
      headerName: "Info",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <CompanyInfo currUser={currUser} companyData={params.row} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            My Placement Status
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabPage}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTabPage}
                  aria-label="lab API tabs example"
                >
                  <Tab label="All Companies" value="1" />
                  <Tab label="Applied" value="2" />
                  <Tab label="Interview" value="3" />
                  <Tab label="Placed" value="4" />
                </TabList>
              </Box>
            </TabContext>
          </Box>

          <DataGrid
            rows={filteredcompanies}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            rowsPerPageOptions={[5, 10, 20, 50]}
            disableSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: { showQuickFilter: true },
            }}
          />
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Apply to {selectedCompany?.companyName}</DialogTitle>
        <DialogContent component="div">
          <DialogContentText component="span">
            Review your profile before submitting your application.
          </DialogContentText>

          <MyInfo currUser={currUser} myinfo={myinfo} open={dialogOpen} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitApplication} color="primary">
            Submit Application
          </Button>
          <Button color="primary" onClick={() => navigate("/profile")}>
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyCompanies;

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: 1,
        height: 1,
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width: "auto", maxWidth: "80vw", marginLeft: -17 }}
        >
          <Paper
            elevation={5}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};
