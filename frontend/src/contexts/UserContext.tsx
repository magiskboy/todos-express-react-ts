import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser, registerUser } from "../apis";
import { toast } from 'react-toastify';

type User = {
  id: string;
  name: string;
  profile?: string;
  email: string;
};

type UserContextProps = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (payload: Omit<User, "id">) => Promise<User | null>;
};

export const UserContext = React.createContext<UserContextProps>({
  user: null,
  token: null,
  loading: false,
  login: () => Promise.resolve(null),
  register: () => Promise.resolve(null),
  logout: async () => Promise.resolve(),
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<{
    user: User | null;
    token: string | null;
  }>({
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const abortController = new AbortController();
    setLoading(true);
    getCurrentUser(token, abortController.signal)
      .then((user) => {
        if (user) {
          setState((state) => ({ ...state, user, token }));
        } else {
          setState((state) => ({ ...state, token: null, user: null }));
        }
      })
      .finally(() => setLoading(false));

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
    }
  }, [state.token]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    return loginUser(email, password)
      .then((data) => {
        setState((state) => ({
          ...state,
          user: data.user,
          token: data.accessToken,
        }));
        return data.user;
      })
      .catch((error) => {
        toast.error(error.message);
        return null;
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    setState({ user: null, token: null });
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const register = useCallback(
    async (payload: Omit<User, "id">) => {
      setLoading(true);
      return registerUser(payload)
        .then((user) => {
          navigate("/login");
          return user;
        })
        .catch((error) => {
          toast.error(error.message);
          return null;
        })
        .finally(() => setLoading(false));
    },
    [navigate]
  );

  return (
    <UserContext.Provider
      value={{
        ...state,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
