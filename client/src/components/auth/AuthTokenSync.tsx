import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

import { setAuthTokenGetter } from "../../lib/axios";

export default function AuthTokenSync() {
  const { getToken } = useAuth();

  useEffect(() => {
    setAuthTokenGetter(() => getToken());

    return () => {
      setAuthTokenGetter(async () => null);
    };
  }, [getToken]);

  return null;
}