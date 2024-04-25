"use client";
import { useEffect, useState } from "react";

const useResize = (clientId: string) => {
  const [client, setClient] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleClientResize = () => {
      const content = document.getElementById(clientId);
      setClient({
        width: content?.clientWidth,
        height: content?.clientHeight,
      });
    };

    handleClientResize();

    window.addEventListener("resize", handleClientResize);

    return () => {
      window.removeEventListener("resize", handleClientResize);
    };
  }, [clientId]);

  return client;
};

export default useResize;
