import React from "react";

export const NoDataView = ({ haveData, children }) => {
  if (!haveData)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}> No data found</div>
    );
  return children;
};
