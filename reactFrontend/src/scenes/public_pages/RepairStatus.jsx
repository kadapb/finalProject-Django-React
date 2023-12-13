import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Image } from "react-bootstrap";

const RepairStatus = () => {
  const [dziumaId, setDziumaId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState(null);

  const getStatusString = (status) => {
    switch (status) {
      case 1:
        return "In line";
      case 2:
        return "Repair in progress";
      case 3:
        return "Done";
      default:
        return "Unknown Status";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dziumaId.trim()) {
      setError("Please enter a valid ID-code.");
      setStatuses([]);
      return;
    }

    try {
      // API call for all repairs from specific client, based on ID
      const response = await fetch(
        `http://localhost:8000/repairs/${dziumaId}/`
      );
      // API call for all repairs from specific client, based on ID

      const result = await response.json();
      console.log("API Response:", result);

      if (Array.isArray(result) && result.length === 0) {
        setError(`No repairs found with ID-code: ${dziumaId}`);
        setStatuses([]);
        return;
      }

      if (!Array.isArray(result)) {
        // Handle the case when result is not an array
        const remainingTime = result.detail;
        const match = parseInt(remainingTime.match(/(\d+) seconds/)[1], 10);
        setError(`Too many requests. Try again in: ${match} seconds`);
        setStatuses([]);
        return;
      }

      // Assuming result is a list, and you want the status for each item
      const extractedStatuses = result.map((item) => ({
        status: getStatusString(item.status),
        dateReceived: new Date(item.date_received).toLocaleDateString(),
        dateReturned: item.date_returned,
        dziumaId: item.dziuma_id,
        name: item.name,
        itemType: item.item_type,
      }));

      setStatuses(extractedStatuses);
      setError(null);
    } catch (error) {
      console.error("Error during fetch:", error);

      if (error.response.status === 429) {
        setError("An error occurred. Please try again. ");
      }
    }
  };

  return (
    <Container className="text-center" style={{ maxWidth: "400px" }}>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto mt-5">
        <Image
          src="/assets/wrench.png"
          alt="wrench icon"
          width="144"
          height="114"
          className="mb-4"
        />
        <h1 className="h3 mb-3 fw-normal">Check Repair Status</h1>

        <Form.Floating>
          <Form.Control
            type="text"
            name="dziuma_id"
            id="dziumaIdInput"
            placeholder=""
            value={dziumaId}
            onChange={(e) => setDziumaId(e.target.value)}
          />
          <label className="ignoreTheme" htmlFor="dziumaIdInput">
            ID-code
          </label>
        </Form.Floating>

        <Button variant="secondary" type="submit" className="w-100 btn-lg mt-3">
          Check
        </Button>
        <div id="result" className="mt-3">
          {error && <p className="alert alert-danger">{error}</p>}
          {statuses.length > 0 && (
            <div className="alert alert-success py-0 pt-3">
              <ul className="list-unstyled">
                {statuses.map((status, index) => (
                  <li key={index}>
                    {index + 1}. {status.itemType} ({status.name}) -{" "}
                    <strong>{status.status}</strong> ({status.dateReceived})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default RepairStatus;
