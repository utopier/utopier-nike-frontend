import { useState, useCallback, ChangeEvent } from "react";

type onChangeType = (e: ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;

export const useInput = (initValue = "") => {
  const [value, setValue] = useState(initValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue] as [string, onChangeType, typeof setValue];
};

