import Button from "@mui/material/Button";

//defining type for the props
interface ButtonProps {
  name?: string; //optional,will default to button,if not passed
}

export default function ButtonUsage({ name = "Button" }: ButtonProps) {
  return <Button variant="contained">{name}</Button>;
}
