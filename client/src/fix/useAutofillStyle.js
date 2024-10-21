import { useEffect } from 'react';

const useAutofillStyle = (ref, defaultStyle, autofillStyle) => {
    const onAnimationStart = ({ animationName }) => {
        if (animationName === 'onAutoFillStart') {
            for (const [key, value] of Object.entries(autofillStyle)) {
                ref.current.style.setProperty(key, value, 'important');
            }
        } else if (animationName === 'onAutoFillCancel') {
            for (const [key, value] of Object.entries(defaultStyle)) {
                ref.current.style.setProperty(key, value, 'important');
            }
        }
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('animationstart', onAnimationStart);
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('animationstart', onAnimationStart);
            }
        };
    }, [ref]);
};

export default useAutofillStyle;
