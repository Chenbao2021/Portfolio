import { JSX, useEffect, useRef, useState } from "react";

function DogSVG(): JSX.Element {
  return (
    <svg
      width="40"
      height="48"
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left ear */}
      <path
        d="M28 38 Q16 22 22 10 Q31 17 32 34"
        fill="#f5f5f5"
        stroke="#2d2d2d"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Right ear */}
      <path
        d="M72 38 Q84 22 78 10 Q69 17 68 34"
        fill="#f5f5f5"
        stroke="#2d2d2d"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Body */}
      <ellipse
        cx="50"
        cy="82"
        rx="26"
        ry="20"
        fill="white"
        stroke="#2d2d2d"
        strokeWidth="2"
      />
      {/* Head */}
      <circle cx="50" cy="46" r="22" fill="white" stroke="#2d2d2d" strokeWidth="2" />
      {/* Tail */}
      <path
        d="M74 70 Q90 56 86 42 Q83 36 77 40"
        stroke="#2d2d2d"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Collar */}
      <rect
        x="36"
        y="64"
        width="28"
        height="6"
        rx="3"
        fill="#fde047"
        stroke="#2d2d2d"
        strokeWidth="1.3"
      />
      {/* Collar tag */}
      <circle cx="50" cy="70" r="3" fill="#ca8a04" stroke="#2d2d2d" strokeWidth="1" />
      {/* Left eye */}
      <circle cx="42" cy="43" r="3.5" fill="#2d2d2d" />
      {/* Right eye */}
      <circle cx="58" cy="43" r="3.5" fill="#2d2d2d" />
      {/* Eye highlights */}
      <circle cx="43.5" cy="41.5" r="1.2" fill="white" />
      <circle cx="59.5" cy="41.5" r="1.2" fill="white" />
      {/* Nose */}
      <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#2d2d2d" />
      {/* Smile */}
      <path
        d="M44 58 Q50 64 56 58"
        stroke="#2d2d2d"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left paw */}
      <rect x="34" y="97" width="10" height="16" rx="5" fill="white" stroke="#2d2d2d" strokeWidth="1.8" />
      {/* Right paw */}
      <rect x="56" y="97" width="10" height="16" rx="5" fill="white" stroke="#2d2d2d" strokeWidth="1.8" />
      {/* Paw toes */}
      <path d="M36 97 Q39 94 42 97" stroke="#2d2d2d" strokeWidth="1" fill="none" />
      <path d="M58 97 Q61 94 64 97" stroke="#2d2d2d" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function SketchDog(): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const flippedRef = useRef(false);
  // Mobile: mobileVisible drives opacity via React style prop
  // Desktop: opacity overridden imperatively by rAF (starts 0, set to 1 on first mousemove)
  const [mobileVisible, setMobileVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) {
      let rafId: number;
      let prevX = -Infinity;

      const handleMouseMove = (e: MouseEvent) => {
        if (e.clientX < prevX) flippedRef.current = true;
        else if (e.clientX > prevX) flippedRef.current = false;
        prevX = e.clientX;
        targetRef.current = { x: e.clientX, y: e.clientY };
        if (divRef.current) divRef.current.style.opacity = "1";
      };

      const animate = () => {
        const cur = posRef.current;
        const tgt = targetRef.current;
        cur.x += (tgt.x - cur.x) * 0.12;
        cur.y += (tgt.y - cur.y) * 0.12;
        if (divRef.current) {
          const scale = flippedRef.current ? -1 : 1;
          divRef.current.style.transform = `translate(${cur.x - 20}px, ${cur.y - 46}px) scaleX(${scale})`;
        }
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafId);
      };
    } else {
      let timeout: ReturnType<typeof setTimeout>;

      const handleTouch = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (divRef.current) {
          divRef.current.style.transform = `translate(${touch.clientX - 20}px, ${touch.clientY - 46}px)`;
        }
        setMobileVisible(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setMobileVisible(false), 3000);
      };

      window.addEventListener("touchstart", handleTouch, { passive: true });
      return () => {
        window.removeEventListener("touchstart", handleTouch);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: mobileVisible ? 1 : 0,
        transition: "opacity 0.4s ease",
        willChange: "transform",
        filter: "drop-shadow(2px 3px 0px rgba(0,0,0,0.12))",
      }}
    >
      <DogSVG />
    </div>
  );
}
