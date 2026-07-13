"use client";

import { useState } from "react";
import { Box } from "@mui/material";

interface TooltipProps {
  title: string;
  children: React.ReactElement;
}

export default function Tooltip({ title, children }: TooltipProps) {
  const [active, setActive] = useState(false);

  return (
    <Box 
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      {children}
      <Box
        sx={{
          position: "absolute",
          bottom: "135%", // Float above the icon
          left: "50%",
          transform: `translateX(-50%) translateY(${active ? "0px" : "8px"})`,
          bgcolor: "#111111",
          color: "#ffffff",
          px: 1.5,
          py: 0.6,
          borderRadius: "2px",
          fontSize: 11,
          fontWeight: 600,
          fontFamily: '"Cairo", sans-serif',
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          opacity: active ? 1 : 0,
          visibility: active ? "visible" : "hidden",
          pointerEvents: "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          zIndex: 100,
          "&::after": {
            content: '""',
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderWidth: "5px",
            borderStyle: "solid",
            borderColor: "#111111 transparent transparent transparent"
          }
        }}
      >
        {title}
      </Box>
    </Box>
  );
}
