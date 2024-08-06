import styled from "@emotion/styled";
import { CloseOutlined } from "@mui/icons-material";
import { IconButton, Modal as MuiModal, Typography } from "@mui/material";
import { ReactNode } from "react";

const StyledModal = styled.div`
  background: #fff;
  max-width: 100%;
  width: 60rem;
  margin: auto;
  overflow: hidden;
  align-self: center;
  border-radius: 0.5rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ddd;
  justify-content: flex-end;

  .MuiButton-root + .MuiButton-root {
    margin-left: 1rem;
  }
`;

export const Modal = ({
  open,
  title,
  footer,
  children,
  onClose,
  width,
}: {
  open?: boolean;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  width?: number | string;
}) => {
  return (
    <MuiModal
      open={!!open}
      onClose={onClose}
      sx={{ overflow: "auto", alignItems: "center", display: "flex" }}
    >
      <StyledModal style={width ? { width } : {}}>
        <ModalHeader>
          {title && (
            <Typography sx={{ m: 0 }} variant="h6" component="h4">
              {title}
            </Typography>
          )}
          <IconButton size="small" onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </StyledModal>
    </MuiModal>
  );
};
