import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { setLoading, setUser } from "../redux/slices/authSlice";

const PrivateRoute = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token"); // Check if token exists

  const fetchUsers = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        "http://localhost:5000/api/users/getsingleuser",
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (!user && token) {
      fetchUsers();
    }
  }, [user, fetchUsers, token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  // If role is required, check if user has permission
  if (role && user?.role !== role) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
