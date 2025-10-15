import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useState } from 'react';

export function Password({ field }: { field: any }) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <InputGroup>
      <InputGroupInput type={!show ? 'password' : 'text'} {...field} />
      <InputGroupAddon>
        <LockIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          onClick={() => setShow((prev) => !prev)}
        >
          {!show ? <EyeIcon /> : <EyeOffIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
