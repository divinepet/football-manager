import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ExpandableSection.scss';

export default function ExpandableSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="expandable">
      <div className="header" onClick={() => setOpen(prev => !prev)}>
        <span>{title}</span>
        <motion.span
          className="arrow"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.02 }}
        >
          ▶
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="inner">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}