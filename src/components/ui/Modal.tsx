import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={modalRef} 
        className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-light)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-light)]">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--color-text-light)]/60 hover:text-[var(--color-text-light)] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
