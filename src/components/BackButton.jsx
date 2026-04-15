import { useNavigate } from "react-router-dom";

const BackButton = () => {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
    >
      ← Back to Dashboard
    </button>
  );
};

export default BackButton;