import React from "react";
import { useController } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  valueDefault?: string;
  placeholder?: string;
  type?: string;
};

const TextField = ({
  name,
  label,
  valueDefault = "",
  placeholder,
  type,
  ...props
}: Props) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, defaultValue: valueDefault });

  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={name}
          {...field}
          {...props}
          type={type}
          placeholder={placeholder}
          className="border p-2 rounded flex-1"
        />
      </div>

      {invalid && <span>{error?.message}</span>}
    </div>
  );
};

export default TextField;
