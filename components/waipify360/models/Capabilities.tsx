import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Snackbar, Alert, Select, MenuItem } from "@mui/material";

import { request } from "@/helpers/request";

const Row = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
`;

const FormCheckbox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    white-space: nowrap;
    margin-left: 4px;
  }
  & input {
    width: 18px;
    height: 18px;
    border: 1px solid #c4c4c4;
  }
  & span {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #9ca5af;
    display: block;
    text-align: right;
    margin-top: -3px;
  }
`;

function Capabilities({

}: {

}) {
  return (
    <>
      <Row>
        <FormCheckbox>
          <input type="checkbox" />
          <label>text generation</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>text-to-video</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>video-to-text</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>text-to-image</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>image-to-text</label>
        </FormCheckbox>
      </Row>
      <Row>
        <FormCheckbox>
          <input type="checkbox" />
          <label>speech-to-text</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>text-to-speech</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>speech-to-speech</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>computer vision</label>
        </FormCheckbox>
        <FormCheckbox>
          <input type="checkbox" />
          <label>embeddings</label>
        </FormCheckbox>
      </Row>
    </>
  )
}

export default Capabilities;
