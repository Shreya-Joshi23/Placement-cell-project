import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CompanyInfo from "../StudentDashboard/CompanyInfo";

import Chip from "@mui/material/Chip";
import { Grid, Typography, Box, Tab, Button, Paper } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
import Popper from "@mui/material/Popper";
import AddCompany from "./AddCompany";
import UsersTableInfo from "./UsersTableInfo";
import ApplicationTableInfo from "./ApplicationTableInfo";

const UsersTable = ({ currUser, myinfo }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tabPage, setTabPage] = useState("1");
  const [allCompanies, setAllCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [openAddCompanyDialog, setOpenAddCompanyDialog] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const handleAddCompanyOpen = () => {
    setOpenAddCompanyDialog(true);
  };

  const handleAddCompanyClose = () => {
    setOpenAddCompanyDialog(false);
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), key: doc.id };
        users.push(data);
      });
      setAllUsers(users);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "companies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const companies = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), key: doc.id };
        companies.push(data);
      });
      setAllCompanies(companies);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "applications"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const apps = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), key: doc.id };
        apps.push(data);
      });
      setApplications(apps);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let index = 1;
    const tempArr = allUsers.reduce((result, data) => {
      switch (tabPage) {
        case "2":
          if (data.accountType !== "Student") return result;
          break;
        case "3":
          if (data.accountType !== "Admin") return result;
          break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredUsers(tempArr);
  }, [allUsers, tabPage]);

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60 },
    {
      field: "name",
      headerName: "User Name",
      width: 200,
      renderCell: renderCellExpand,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      width: 200,
      renderCell: renderCellExpand,
    },
    {
      field: "accountType",
      headerName: "Type",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.accountType === "Student" ? (
              <Chip label="Student" color="success" />
            ) : params.row.accountType === "Admin" ? (
              <Chip label="Admin" color="error" />
            ) : (
              <Chip label={params.row.accountType} color="warning" />
            )}
          </>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return <UsersTableInfo currUser={params.row} />;
      },
    },
  ];

  const columnscomp = [
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
      headerName: "Job Role",
      width: 200,
      renderCell: renderCellExpand,
    },
    {
      field: "skills",
      headerName: "Skills Required",
      width: 400,
      renderCell: renderCellExpand,
    },
    {
      field: "description",
      headerName: "Info",
      width: 600,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <CompanyInfo companyData={params.row} />
          </>
        );
      },
    },
  ];

  const columnsApps = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60 },
    { field: "studentName", headerName: "Student Name", width: 200 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "jobRole", headerName: "Job Role", width: 200 },
    { field: "applicationDate", headerName: "Application Date", width: 150 },
    {
      field: "interviewStatus",
      headerName: "Interview Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.interviewStatus === "Scheduled" ? (
              <Chip label="Scheduled" color="success" />
            ) : params.row.interviewStatus === "pending" ? (
              <Chip label="Pending" color="error" />
            ) : (
              <Chip label={params.row.interviewStatus} color="warning" />
            )}
          </>
        );
      },
    },
    {
      field: "placementStatus",
      headerName: "Placement Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.placementStatus === "Placed" ? (
              <Chip label="Placed" color="success" />
            ) : params.row.placementStatus === "NotPlaced" ? (
              <Chip label="Reject" color="error" />
            ) : (
              <Chip label={params.row.placementStatus} color="warning" />
            )}
          </>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return <ApplicationTableInfo currapplication={params.row} />;
      },
    },
  ];

  const applicationsData = applications.map((app, index) => ({
    id: index + 1,
    studentName:
      allUsers.find((user) => user.uid === app.studentID)?.name || "Unknown",
    companyName:
      allCompanies.find((company) => company.key === app.companyID)
        ?.companyName || "Unknown",
    jobRole:
      allCompanies.find((company) => company.key === app.companyID)?.jobRole ||
      "Unknown",
    applicationDate: app.applicationDate,
    interviewStatus: app.interviewStatus,
    placementStatus: app.placementStatus,
    key: app.key,
  }));

  const companiesdata = allCompanies.map((app, index) => ({
    cid: index + 1,
    ...app
  }));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    backgroundColor: "#e0f7fa",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4">{allUsers.length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    backgroundColor: "#ffeb3b",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Total Applications</Typography>
                  <Typography variant="h4">{applications.length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    backgroundColor: "#ffcdd2",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Total Companies</Typography>
                  <Typography variant="h4">{allCompanies.length}</Typography>
                </Paper>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabPage}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTabPage}
                  variant="scrollable"
                  aria-label="lab API tabs example"
                >
                  <Tab label="All" value="1" />
                  <Tab label="Student" value="2" />
                  <Tab label="Admin" value="3" />
                  <Tab label="Companies" value="4" />
                  <Tab label="Applications" value="5" />
                </TabList>
              </Box>
            </TabContext>
          </Box>
          
          { tabPage === "4" ? (
            <>
              <DataGrid
                rows={companiesdata}
                columns={columnscomp}
                pageSize={pageSize}
                getRowId={(row) => row.key}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCompanyOpen}
              >
                Add Company
              </Button>
            </>
          ) : tabPage === "5" ? (
            <DataGrid
              rows={applicationsData}
              columns={columnsApps}
              pageSize={pageSize}
              getRowId={(row) => row.key}
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
          ) : (
            <DataGrid
              rows={filteredUsers}
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
          )}
        </Grid>
      </Grid>
      <AddCompany
        open={openAddCompanyDialog}
        handleClose={handleAddCompanyClose}
      />
    </>
  );
};

export default UsersTable;

// For overflown visibility
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
