import { Input } from "@windmill/react-ui";

const DateInput = ({
  name,
  label = "Date",
  disabled = false,
  register,
  required = false,
  defaultValue,
  placeholder,
  minDate,
  maxDate,
}) => {
  const registerOptions = {
    required: required ? `${label} is required!` : false,

  };

  return (
    <div className="flex flex-row">
      <Input
        {...register(name, registerOptions)}
        name={name}
        type="date"
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder || `Select ${label}`}
        className="mr-2 p-2"
      />
    </div>
  );
};

export default DateInput;
