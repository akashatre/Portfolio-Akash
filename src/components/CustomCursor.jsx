import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="cursor-dot"
                animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
            />
            <motion.div
                className="cursor-ring"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.5)'
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            />
            <style>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: var(--primary-color);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
        }
        @media (match-media: (pointer: coarse)) {
          .cursor-dot, .cursor-ring {
            display: none;
          }
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
