import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        // Perform logout operations
        logout(); // Assuming your auth context clears the user data and any auth tokens
        navigate('/login'); // Redirect to login after logout
    };

    // It seems you want the logout to happen automatically when this component is rendered,
    // However, calling a function directly in the body like this will lead to the error you encountered.
    // Instead, you can use an effect hook to handle this upon component mount if auto-logout is intended.
    React.useEffect(() => {
        handleLogout();
        // If you only want to logout without any user interaction, you can call handleLogout() here
        // This will run only once when the component mounts
    }, []); // Empty dependency array ensures this runs only once

    return null; // Since it seems you might not need to render anything
}

export default Logout;
