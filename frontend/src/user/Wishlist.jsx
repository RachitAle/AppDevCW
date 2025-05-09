import { useLocation } from "react-router-dom";

const Wishlist = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  return (
    <div className="p-8">
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold">Your Wishlist</h1>
      {/* Your Wishlist Component JSX */}
      {/* Display list of wishlist items here */}
    </div>
  );
};

export default Wishlist;
