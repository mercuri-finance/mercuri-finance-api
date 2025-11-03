import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

const SelectContainer = styled.div<{ $open: boolean }>`
  position: relative;
  width: 100%;
  font-size: 1rem;
  color: #aeb9c8;
  background: #0a0e12;
  border: 1px solid ${({ $open }) => ($open ? '#e3ffc1' : '#1e252b')};
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;

  &:hover {
    border-color: #e3ffc1;
  }
`;

const Selected = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Options = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #0a0e12;
  border: 1px solid #1e252b;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  z-index: 2000;
  overflow: hidden;
`;

const Option = styled.div<{ $selected?: boolean }>`
  padding: 0.75rem 1rem;
  color: ${({ $selected }) => ($selected ? '#aeb9c8' : '#aeb9c8')};
  background: ${({ $selected }) => ($selected ? '#1a222d' : 'transparent')};
  transition: background 0.15s ease-in-out;

  &:hover {
    color: #e3ffc1;
  }
`;

export const CustomSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || 'Select...';

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContainer ref={ref} $open={open} onClick={() => setOpen((p) => !p)}>
      <Selected>{selectedLabel}</Selected>

      {open && (
        <Options>
          {options.map((opt) => (
            <Option
              key={opt.value}
              onClick={(e) => {
                e.stopPropagation(); // prevent re-toggling
                onChange(opt.value);
                setOpen(false);
              }}
              $selected={opt.value === value}
            >
              {opt.label}
            </Option>
          ))}
        </Options>
      )}
    </SelectContainer>
  );
};
