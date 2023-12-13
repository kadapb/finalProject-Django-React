import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';


const RepairDetailsModal = ({ repair, onClose }) => {
    const [editableRepair, setEditableRepair] = useState({ ...repair });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableRepair((prevRepair) => ({
        ...prevRepair,
        [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
          // Make a PATCH request to your API
          const response = await fetch(`http://127.0.0.1:8000/repair/${editableRepair.id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editableRepair),
          });
      
          if (response.ok) {
            // Successfully saved, you might want to handle the response data
            console.log('Saved successfully:', response.json());
            window.location.reload();
          } else {
            // Handle error response
            console.error('Error saving data:', response.statusText);
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error saving data:', error);
        }
      
        // Close the modal whether successful or not
        onClose();
      };

    const handleClose = () => {
        onClose();
    };

    const handleDelete = async () => {
        try {
          // Make a PATCH request to your API
          const response = await fetch(`http://127.0.0.1:8000/repair/${editableRepair.id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editableRepair),
          });
      
          if (response.ok) {
            // Successfully saved, you might want to handle the response data
            console.log('Saved successfully:', response.json());
            window.location.reload();
          } else {
            // Handle error response
            console.error('Error saving data:', response.statusText);
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error saving data:', error);
        }
        onClose();
    };

    return (
        <Box m="20px">
        <Dialog open={Boolean(repair)} onClose={onClose}>
        <DialogTitle>Repair Details</DialogTitle>
        <DialogContent>
            {repair && (
            <form>
            <Box m="10px" display="flex" justifyContent="flex-end">
                <label style={{ marginRight: '10px' }}>ID: </label>
                <div className="readOnlyRep">{editableRepair.id} </div>
              </Box>
              <Box m="10px" display="flex" justifyContent="flex-end">
                <label style={{ marginRight: '10px' }}>Status: </label>
                <select name="status" value={editableRepair.status} onChange={handleInputChange}>
                    <option value="1">In line</option>
                    <option value="2">Working on it</option>
                    <option value="3">Done</option>
                </select>
              </Box>
              <Box m="10px" display="flex" justifyContent="flex-end">
                <label style={{ marginRight: '10px' }}>Date Received: </label>
                <div className="readOnlyRep">{new Date(editableRepair.date_received).toLocaleString()}</div>
              </Box>
            <Box m="10px" display="flex" justifyContent="flex-end">
            <label style={{ marginRight: '10px' }}>Date Returned: </label>
            <div className="readOnlyRep">{repair.date_returned ? new Date(repair.date_returned).toLocaleString() : 'Not returned yet'} </div>
            </Box>   
            <Box m="10px" display="flex" justifyContent="flex-end">  
            <label style={{ marginRight: '10px' }}>Dziuma ID: </label>
            <div className="readOnlyRep">{repair.dziuma_id} </div>
            </Box>  
            <Box m="10px" display="flex" justifyContent="flex-end"> 
            <label style={{ marginRight: '10px' }}>Name: </label>
            <div className="readOnlyRep">{repair.name} </div>
            </Box>
            <Box m="10px" display="flex" justifyContent="flex-end">    
            <label style={{ marginRight: '10px' }}>Item Type: </label>
            <div className="readOnlyRep">{repair.item_type} </div>
            </Box>
            <Box m="10px" display="flex" justifyContent="flex-end">
            <label style={{ marginRight: '10px' }}>Service Fee: </label>
            <div className="readOnlyRep">{repair.service_fee}</div>
            </Box> 
            <Box m="10px" display="flex" justifyContent="flex-end">
            <label style={{ marginRight: '10px' }}>Extra Fee: </label>
            <input
                  type="text"
                  name="extra_fee"
                  value={editableRepair.extra_fee}
                  onChange={handleInputChange}
                />
            </Box>
        </form>
            )}
        </DialogContent>
        <DialogActions>
        <Box m="10px" display="flex" justifyContent="center">
            <Button onClick={handleDelete} color="warning" >
                Delete
            </Button>
        </Box> 
        <Box m="10px" display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary" >
            Close
            </Button>
        </Box>
        <Box m="10px" display="flex" justifyContent="center">
            <Button onClick={handleSave} color="success" >
                Save
            </Button>
        </Box> 

        </DialogActions>
        </Dialog>
        </Box>
    );
    };

    export default RepairDetailsModal;
