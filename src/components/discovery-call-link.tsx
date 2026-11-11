import type { MouseEvent, ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

type DiscoveryCallLinkProps = Pick<ButtonProps, 'variant' | 'size' | 'className' | 'onClick'> & {
  children: ReactNode;
  icon?: LucideIcon;
};

export function DiscoveryCallLink({ children, icon: Icon = ArrowRight, ...props }: DiscoveryCallLinkProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event);
    if (!event.defaultPrevented) window.dispatchEvent(new Event('inner-bloom:book'));
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
      <Icon aria-hidden="true" />
    </Button>
  );
}
