import React from "react";

const Map = () => {
  const storeLocations = [{}, {}];

  return (
    <div className="max-padd-container bg-white mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {storeLocations.map((location, index) => (
          <div key={index} className="mb-8">
            <div className="rounded-lg overflow-hidden shadow-md">
              {location.iframe}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
