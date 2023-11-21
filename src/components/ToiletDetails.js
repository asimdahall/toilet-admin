// components/ToiletDetails.js
import React, { useEffect, useState } from "react";
import ToiletService from "../services/ToiletService";

function ToiletDetails({ match }) {
  const [toilet, setToilet] = useState(null);

  useEffect(() => {
    ToiletService.get(match.params.id).then((response) => {
      setToilet(response.data);
    });
  }, [match.params.id]);

  return <div>{/* Render your toilet details here */}</div>;
}

export default ToiletDetails;
