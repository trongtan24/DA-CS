function productCardContainer() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Product Card</h2>
        <p className="text-sm text-gray-500">
          A card that displays product information.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {/* Product Card Component */}
        <div className="w-1/4 p-4 border rounded shadow">
          <img
            src="https://via.placeholder.com/150"
            alt="Product"
            className="w-full h-32 object-cover mb-2"
          />
          <h3 className="text-lg font-semibold">Product Name</h3>
          <p className="text-sm text-gray-500">$19.99</p>
        </div>
      </div>
    </div>
  );
}