import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box,} from "@mui/material";
import type {Event} from "../components/EventCard"; // Import the Event type
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Alert from '@mui/material/Alert';
import {enqueueSnackbar} from 'notistack'

function Admin() {
  const { admin } = useAuth(); // Use isAdmin for checking admin status

  // State for managing dialog visibility
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [tableData, setTableData] = useState<Event[]>([]); // State for table data
  // just add the value to the table data. 
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [refresh, setRefresh] = useState(false); 
  // State for delete confirmation
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/events"); // Replace with your API endpoint
        if (response.ok) {
          const data: Event[] = await response.json();
          setTableData(data); // Populate tableData with fetched events
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchEvents();
  }, [refresh])

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Event Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "subtitle", headerName: "Subtitle", width: 200 },
    { field: "event_date", headerName: "Event Date", width: 150 },
    { field: "start_datetime", headerName: "Start Time", width: 200 },
    { field: "end_datetime", headerName: "End Time", width: 200 },
     { field: "image_url_2", headerName: "Image URL", width: 300 },
  ];

  // Handlers for opening and closing dialogs
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // Handlers for form submissions
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
   const formData = new FormData(e.currentTarget as HTMLFormElement);
   const eventData = Object.fromEntries(formData.entries());
   // contains all the form data into an object and calls the edit api route. 
   try {
    const response = await fetch("/api/events/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (response.ok) {
      //setTableData(prevEvents => [...prevEvents, data]);
      enqueueSnackbar('Edit made successfully! 🎉', { variant: 'success' });
       // Show success message
      handleCloseCreate(); // Close the dialog
      setRefresh(!refresh); // Refresh the table data
    } else {
      //alert(data.message); // Show error message
      enqueueSnackbar('Error creating event', { variant: 'error' });
    }
  } catch (error) {
    console.error("Error creating event:", error);
    alert("An error occurred. Please try again.");
  }
  
   
    
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const eventData = Object.fromEntries(formData.entries());
    // contains all the form data into variable
    
    try {
        const response = await fetch(`/api/events/${eventData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData), // Send only the fields that are filled
        });
    
        if (response.ok) {
          enqueueSnackbar("Event updated successfully! 🎉", { variant: "success" });
          setRefresh(!refresh); // Refresh the table data
          handleCloseUpdate(); // Close the dialog
        } else {
          const data = await response.json();
          enqueueSnackbar(data.message || "Failed to update event.", { variant: "error" });
        }
      } catch (error) {
        console.error("Error updating event:", error);
        enqueueSnackbar("An error occurred. Please try again.", { variant: "error" });
      }
  
  };

  const handleDeleteEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id"); // Get the event ID from the form
    console.log("Deleting event with ID:", id);
  
    if (!id) {
      alert("Event ID is required to delete an event.");
      return;
    }

  
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
         
      });
        const data = await response.json();

  
      if (response.ok) {
        //alert(data.message); // Show success message

        setRefresh(!refresh); // Refresh the table data
        alert(data.message); 
        enqueueSnackbar('Event deleted successfully! 🎉', { variant: 'success' });
        handleCloseDelete(); // Close the dialog
      } else {
        //alert(data.message); // Show error message
       
        enqueueSnackbar('Event id not found', { variant: 'error' });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!admin) {
    return <p>You do not have access to this page.</p>; // Show a fallback message for non-admin users
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>

      {/* Buttons for admin actions */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create Event
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpenUpdate}>
          Update Event
        </Button>
        <Button variant="contained" color="error" onClick={handleOpenDelete}>
          Delete Event
        </Button>
      </Box>

      {/* Create Event Dialog */}
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateEvent} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Event Name" name="name" fullWidth required />
            <TextField label="Description" name="description" fullWidth required />
            <TextField label="Subtitle" name="subtitle" fullWidth required />
            <TextField label="Event Date" name="event_date" type="date" fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="Start Time" name="start_datetime" type="datetime-local" fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="End Time" name="end_datetime" type="datetime-local" fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="Price" name="price" type="number" fullWidth required />
            <TextField label="Image URL" name="image_url_2" fullWidth required />
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
              <Button onClick={handleCloseCreate} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Update Event Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdateEvent} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Event ID" name="id" fullWidth required />
            <TextField label="Event Name" name="name" fullWidth />
            <TextField label="Description" name="description" fullWidth />
            <TextField label="Subtitle" name="subtitle" fullWidth />
            <TextField label="Event Date" name="event_date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Start Time" name="start_datetime" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="End Time" name="end_datetime" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Price" name="price" type="number" fullWidth />
            <TextField label="Image URL" name="image_url_2" fullWidth />
            <DialogActions>
              <Button type="submit" variant="contained" color="secondary">
                Update
              </Button>
              <Button onClick={handleCloseUpdate} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleDeleteEvent} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Event ID" name = "id" fullWidth required />
            <DialogActions>
              <Button type="submit" variant="contained" color="error">
                Delete
              </Button>
              <Button onClick={handleCloseDelete} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* DataGrid for displaying events */}
      <div>
  <DataGrid
    rows={tableData}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 10,
          page: 0,
        },
      },
    }}
    loading={loading}
    getRowId={(row) => row.id}
    sx = {{ 
        "& .MuiDataGrid-cell": {
            color: "white", // Set text color to white for cells
          },
          "& .MuiDataGrid-columnHeaders": {
            color: "black", // Set text color to white for column headers
          },
        }}
  />
</div>
</div>
  );
}

export default Admin;