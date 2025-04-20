import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type FlipCardProps = {
  showFront: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  sx?: React.CSSProperties;
};

const MotionBox = motion(Box);

const FlipCard: React.FC<FlipCardProps> = ({ showFront, front, back, sx }) => {
  const hasMounted = useRef(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    hasMounted.current = true;
    setAnimate(true); // trigger animation only after first mount
  }, []);

  return (
    <Box sx={{ perspective: 1000, ...sx }}>
      <MotionBox
        animate={{ rotateY: showFront ? 0 : 180 }}
        initial={false} // don't animate from initial -> animate on first load
        transition={{ duration: animate ? 0.6 : 0 }}
        sx={{
          position: "relative",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {front}
        </Box>
        <Box
          sx={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {back}
        </Box>
      </MotionBox>
    </Box>
  );
};

export default FlipCard;
