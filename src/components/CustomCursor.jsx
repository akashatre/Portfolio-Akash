import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const move = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + 'px';
                cursorRef.current.style.top  = e.clientY + 'px';
            }
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px';
                dotRef.current.style.top  = e.clientY + 'px';
            }
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return (
        <>
            <div ref={cursorRef} style={{
                position: 'fixed', pointerEvents: 'none', zIndex: 9999,
                width: 24, height: 24, borderRadius: '50%',
                border: '1px solid rgba(250, 250, 250, 0.15)',
                transform: 'translate(-50%,-50%)',
                transition: 'left 0.1s ease-out, top 0.1s ease-out',
            }} />
            <div ref={dotRef} style={{
                position: 'fixed', pointerEvents: 'none', zIndex: 9999,
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--primary-color)',
                transform: 'translate(-50%,-50%)',
            }} />
        </>
    );
};

export default CustomCursor;
