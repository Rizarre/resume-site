'use client';

import { Download, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const RESUME_PATH = '/Sean-Rizarre-Reyes-Resume.pdf';
const RESUME_FILENAME = 'Sean-Rizarre-Reyes-Resume.pdf';

interface ResumeMenuProps {
  /** The button that opens the menu — rendered as the trigger via `asChild`. */
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  /** Match the trigger's width when the trigger is a full-width button. */
  matchTriggerWidth?: boolean;
}

/**
 * Resume actions shared by the header and the contact card: view the PDF in a
 * new tab, or download it. Both are plain anchors so the browser handles them
 * natively — `download` on a same-origin file saves it instead of navigating.
 */
export function ResumeMenu({ children, align = 'end', matchTriggerWidth = false }: ResumeMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={matchTriggerWidth ? 'w-(--radix-dropdown-menu-trigger-width)' : 'w-48'}
      >
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Open Resume
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href={RESUME_PATH} download={RESUME_FILENAME}>
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
