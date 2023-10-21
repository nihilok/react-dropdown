import React, { useEffect, useRef, useState, useMemo } from 'react';
import './Dropdown.module.css';
import classNames from 'classnames';
import {Props, StyleState} from "./Dropdown.types";

const Dropdown = ({ isOpen, onClose, children, className, toggle }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<StyleState>({});

  // handle outside clicks
  useEffect(() => {
    const mouseListener = (event: MouseEvent) => {
      if (!isOpen) return;
      if (!menuRef.current?.contains(event.target as HTMLElement)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', mouseListener);
    return () => {
      window.removeEventListener('mousedown', mouseListener);
    };
  }, [isOpen, onClose]);

  // handle escape key
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyListener);
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [isOpen, onClose]);

  // update position if outside viewport
  useEffect(() => {
    const updatePosition = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        const left =
          rect.right > window.innerWidth
            ? window.innerWidth - rect.width
            : rect.left;
        const top =
          rect.bottom > window.innerHeight
            ? window.innerHeight - rect.height
            : rect.top;
        setDropdownStyle({ position: 'fixed', top: `${top}px`, left: `${left}px` });
      }
    };

    if (isOpen) {
      updatePosition();
      const resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(menuRef.current as HTMLElement);
      return () => {
        resizeObserver.disconnect();
      };
    } else {
      setDropdownStyle({});
    }
    return () => {
      setDropdownStyle({});
    };
  }, [isOpen]);

  // disable scroll while dropdown open (like select element)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const dropdownToggle = useMemo(() => toggle, []);

  return (
    <div className={"dropdownWrapper"} data-testid="dropdown-wrapper">
      {dropdownToggle}
      {isOpen ? (
        <div
          className={classNames("dropdownMenu", className)}
          ref={menuRef}
          style={dropdownStyle}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
