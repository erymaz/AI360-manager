import { OutcomeBox } from "./outcome-box";
import { useViewport } from "@/helpers/use-viewport";
import { Alert, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useImperativeHandle } from "react";
import { ReactNode, useRef } from "react";

export interface OutcomeProps {
  title?: string;
  children?: ReactNode;
  buttons?: ReactNode;
}

export const Outcome = forwardRef(
  ({ title, children, buttons }: OutcomeProps, ref) => {
    Outcome.displayName = "Outcome";
    const contentRef = useRef<HTMLDivElement>(null);
    const { isDesktop } = useViewport();

    useImperativeHandle(ref, () => ({
      copyText: () => {
        copyTextToClipboard(contentRef.current?.innerText || "");
      },
    }));

    const fallbackCopyTextToClipboard = (text: string) => {
      var textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }

      document.body.removeChild(textArea);
    };

    const copyTextToClipboard = (text: string) => {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text);
    };

    return (
      <OutcomeBox
        title={isDesktop ? title : ""}
        actions={
          <Grid container gap={isDesktop ? 2 : 1} mb={2}>
            {buttons}
          </Grid>
        }
      >
        <Box sx={{ whiteSpace: "pre-wrap" }} ref={contentRef}>
          {children}
        </Box>
      </OutcomeBox>
    );
  }
);
