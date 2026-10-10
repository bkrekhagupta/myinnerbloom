import type { ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

export const DISCOVERY_CALL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScvRxyAlD35OqQ1qk41LWvUV5504WJ3RftWtOxm6lJfAitGVw/viewform?usp=header';

type DiscoveryCallLinkProps = Pick<ButtonProps, 'variant' | 'size' | 'className' | 'onClick'> & {
  children: ReactNode;
  icon?: LucideIcon;
};

export function DiscoveryCallLink({ children, icon: Icon = ArrowRight, ...props }: DiscoveryCallLinkProps) {
  return (
    <Button asChild {...props}>
      <a href={DISCOVERY_CALL_URL} target="_blank" rel="noopener noreferrer">
        {children}
        <Icon aria-hidden="true" />
      </a>
    </Button>
  );
}
