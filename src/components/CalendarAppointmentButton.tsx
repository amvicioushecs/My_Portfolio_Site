import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

export default function CalendarAppointmentButton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Add stylesheet if not already present
    const stylesheetId = 'google-calendar-scheduling-css';
    if (!document.getElementById(stylesheetId)) {
      const link = document.createElement('link');
      link.id = stylesheetId;
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // 2. Load script
    const scriptId = 'google-calendar-scheduling-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    const initializeButton = () => {
      if (containerRef.current && (window as any).calendar?.schedulingButton) {
        // Clear any existing content inside the container itself
        containerRef.current.innerHTML = '';
        
        // Find if a button already exists in the parent (social-links-row)
        const parent = containerRef.current.parentElement;
        if (parent) {
          const existingButtons = parent.querySelectorAll('button');
          if (existingButtons.length >= 1) {
            // Keep the first one, remove any duplicates beyond it
            for (let i = 1; i < existingButtons.length; i++) {
              existingButtons[i].remove();
            }
            return;
          }
        }

        (window as any).calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/AcZssZ2hn5YgDqtQcb4J3cXitbKozxURBB4unDx0h2w=?gv=true',
          color: '#92a7d6',
          label: 'Book an appointment',
          target: containerRef.current,
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      script.onload = initializeButton;
      document.body.appendChild(script);
    } else {
      // If script is already loaded/loading, check if API is available or attach listener
      if ((window as any).calendar?.schedulingButton) {
        initializeButton();
      } else {
        const checkInterval = setInterval(() => {
          if ((window as any).calendar?.schedulingButton) {
            initializeButton();
            clearInterval(checkInterval);
          }
        }, 100);
        return () => clearInterval(checkInterval);
      }
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="inline-block" 
      id="calendar-appointment-hero-btn"
    />
  );
}
