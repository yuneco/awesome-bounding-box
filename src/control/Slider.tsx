import { FC } from "react";

type Props = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export const Slider: FC<Props> = ({ label, min, max, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
