import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Snackbar, Alert, Select, MenuItem } from "@mui/material";

import { request } from "@/helpers/request";
import { modelTypes } from "@/helpers/models";

const Row = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

const FormController = styled.div`
  width: 100%;
  position: relative;
  & label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    margin-bottom: 4px;
    display: block;
    white-space: nowrap;
  }
  & input {
    border: 1px solid #c4c4c4;
    padding: 8px 5px 8px 14px;
    font-size: 16px;
    font-weight: 400;
    // color: #9ca5af;
    border-radius: 4px;
    margin-top: 1px;
    width: 100%;
    :focus {
      outline: none;
    }
  }
  & textarea {
    border: 1px solid #c4c4c4;
    padding: 8px 5px 8px 14px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    // color: #9ca5af;
    border-radius: 8px;
    width: 100%;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    height: 88px;
    :focus {
      outline: none;
    }
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
  & .ai-magic {
    border: 1px solid #c4c4c4;
    border-radius: 8px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMzU1OV8yODIyMCIgdHJhbnNmb3JtPSJzY2FsZSgwLjAxNTYyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF8zNTU5XzI4MjIwIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFCQUNBWUFBQUNxYVhIZUFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUFBbHdTRmx6QUFBQnV3QUFBYnNCT3V6ajRnQUFBQmwwUlZoMFUyOW1kSGRoY21VQWQzZDNMbWx1YTNOallYQmxMbTl5WjV2dVBCb0FBQVpLU1VSQlZIaWM1WnRycUZWRkZNZC82MTV2dm0rbDVRTXplNkNsQm9VRnlxVVBpU1pwUlZBcHBXa3BQaXJCQWswa0tTR3hwSUpiUnBpcElFV0lCaUptWVZrK2c0SlFVM3ZRUTFMcFlscVdvWlhQdS9vd2MzRzM3OHplNSt3OSt4eWhCZlBoek9PLzF2cnZOYk5uMXV3anFrb0lFWkVwd0Z6Z0oyQ3lxdTRMQWx5d1NBZ0NSS1F2OERWUVo2czJxT3JJM01BVmtKcEFPSk01N3p6QUhTSnlUU0RzUWlVM0FTSlNBNHh6TkkzUGkxMEpDUkVCdzRCZWp2ci9EUUUrUjY4VmtZWUErSVZLTGdKRXBDTndiMEtYQ1hud0t5RjVJMkF1MERHaGZieUk5TStwbzFoUjFVd0ZHQUUwQXhvcEh3UEhZM1ZmQVIyeTZpbTZaSFcrSjNBazV1Z0pvRGZ3Vkt4ZWdSWFZkalFZQVVBdHNObmg1R3piWGdkODQyaC9wTnJPaGlMZ1JZZHp1NEc2U0oraHdMbFluNytBVzZydGNHWUNnRXVCdFE3bkR3TlhPZnJQY1BUOUIzaXMyazZYVFFBd0dOanZjV2hJd3JoRmpqRUtyQUxxcSsxOEtnR0FBRE9CMHc0blRnUDNwWXl2QWQ3MWtQQWpNT2lDSkFEb1lSM2Y0ekgrZCtDMkVxT25CbWowNEp3RzFnRDNSTmVRcWhBQXRBVkdBKzhEWnowR0svQUQwSzlzUlRBOUJmZFg0TlZLUjBXTGNST3RBVDdqMUs3cXJ3T1haRllHRGNDdUZEMEtiQVA2Vm9RQW9IdktrMUhnODFCUEJyT1BtQTc4a2FKemJTVUlxQUU2VzZPU1pDOG0xWlZiVlBVY0pncWFVcnAyQ2FFdlZleFRlWTNXRzVkNE9RSThuUFBwWHdZc3AvVVpJbDUrQVlhVmlOa1JlQUFZbkhrTnNFRDlnQVhBd1JUajNnTTZaM0QrVnBMWG1XWmdLekFKNkZRaVpnM3dSUVJqU21ZQ1lxRERnYmN4MjFlWHNYdUFQbVU0L3hCd3lvTzFENWdIWEoyQjFQc2RrZE1tRndFeEJmV1dDSmZoaHlsaFlRU2U4WXcvanNrbVNZNHB0ZDZCZTFjd0FpS0tKbm1pNFJEUU8ySGNOSS96dTRIcnNqcHVzYnNCWnh6WXE0TVRZQlVPeE9UKzR3cS9kTTFaNEhhUGdVdUFkbm1jdC9pelBlU2VCTG9GSjhBcTdZRDdSTGdtMXE4dmNDeldweGtZbjlkeGl6OGdZWDFTWUVPcFV5dUw4azdBZHc2bFl5SjlOanJhRndSeXZqMG16WmIwcGxKZ2JpRUVXQ051eEJ5Rm93cWJNSnVxTVE1anRnQzFBWnl2QTk1eDRDL0RiTlNpZFdlQnV3c2h3QnJ6cU1PUXBjRFBzYnJEUU04QXpsOEpmT2JRK2FrbFpwRGpvVFJqOWpaZTh2TWF0U29sRE04QnczUHFxTUdjVW84NjhBOUZ5Y1VjNmx4MmJNRnp1TXBMZ085VmxPbVZGTU1lQUN4MFJGUkxPUW8wT01ZdFRMQm5PekFGdURnSUFWYWhhelBTVXNyYWxFUklYWmNTV1R0dzVDRWpHQTlpMHZTKzhTZUFXYUVJY0MxNmlqazhsYlV0dFhqelVweGZUZ243Q09BRzRQc0VuR2JnaWhDWG8rdUFQeDMxSzFYMWJBYTh1cFQyWTVnVlBrMyt4dXdWZkNKQWJlNElzR3d2cFRYRE4yZkU2Z2xzY3VCRnkxYWdld0xHS0V6ZTBqZitGUEJza0NsZ0ZRNkpLZGdWQUxNQmVBTi81cWdKdU1reGJnNytmTU5lek5YZCtUZEhDQUtzNGxkc2FCN0JzVHJud0cyTFdibGRpOW9Cb0d1azcyaVA0enZ3M0VvRkk4QWEwSlVNQzErSjJOZmJKeGgzN2lQTVhxRS9yVyttRlpQSWJldkZMY0xZb2dybUhPQTZqRFVDMzhicW1vRnhxWmpWZGlvRENmV1lXNldrUlZLQkYwckJDL0tkWUtWRlJBWmh6Z1VYZWJwc0I0YXF5VUFuU3FqdkJKMGlJak5FWkp1SUxCQ1J0TlI3eWFLcU80SG5QYzFuZ0xHbE9OOENWbFNvRHVPL0lmbDRZUHhldUZQNVpWMm9GQmtCVDZiOHppV3EyZ1I4NG1oNnExeWdJcDcrNWJoUGlkNXZDVExxR1J2RC93MjQ2RUtJZ0NlQU5vNzZtWUgxck1ic0RWcGt2cXFlTGd1aGdLZnYrajRvV3FZRjF0Y0ZrN1lmQnRTVU96N29hMUJFQm1EbVpZK0ViaWVCVWFxNk9aamlIQkpzQ29qSUJNdzlYZHo1RDJLLzJ3RWJSV1NPaUVnby9aa2xaL2pWWThKdksrNXdYMm43emZlMDc4U3NGeVZmWkFTZnNqbWNuMFZ5MnVsRG9MM3RLOENiQ1gzUEFDOVQwRUVxT0FHWXEvU2tmZmdpSEtsb3pGNGc2V3VVT3l0TlFOWTFvRk5DbXdMNzFiMFZQWWpKeG1UQkxVWnlUSUZsSkgvcHNaeklhd2w0T3FYL2V1eVV1ZUNuUU1TcGdaaHZoNXM4VHIxayswMzF0QjhGRmhNd2cxUlJBaUpFMUdKT1o2NG4zSWo3UzlNVlhBRC9Jd2dMQmlOSmZqT29KV2xxdFIwdmhBQkxRdnlBRWkvUFZkdnBRZ213SkN6eE9MK0pEUHYxSWtzaEtURVI2WU81cjQ5dmRVZW82c2JnQ25OSUljZGhWVDJBK2Q0M0tvZHdKekNxS2tWbWhCYkhmaTlSMWVZQzlXV1NRclBDSXRLSXVhcmVERXhVMVpPRktjc28vd0pVQ3o3Z2tlbzFWQUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
    width: 36px;
    height: 36px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{ position: "absolute", right: "13px", top: "12px" }}
  >
    <path
      d="M14.9405 6.71289L10.0505 11.6029C9.47305 12.1804 8.52805 12.1804 7.95055 11.6029L3.06055 6.71289"
      stroke="#9CA5AF"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ModelInfo({

}: {

}) {
  return (
    <>
      <Row>
        <FormController style={{ width: '100%', maxWidth: 300 }}>
          <label>Provider</label>
          <Select
            size="small"
            name="headquarters_city_id"
            sx={{ width: "100%" }}
            inputProps={{ IconComponent: () => null }}
            // value={formData.headquarters_city_id || ""}
            // onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select provider
            </MenuItem>
          </Select>
          <div style={{ position: "absolute", top: 25, right: 1 }}>
            <ChevronDown />
          </div>
          {/* <p className="text-danger">
            {validation.headquarters_city_id}
          </p> */}
        </FormController>
        <FormController>
          <label>Model Name</label>
          <input
            type="text"
            placeholder="Write the exact model name"
            name="model_name"
          />
        </FormController>
        <FormController style={{ width: 'fit-content' }}>
          <label>AI Magic</label>
          <div className="ai-magic"></div>
        </FormController>
      </Row>
      <Row>
        <FormController style={{ width: '100%', maxWidth: 300 }}>
          <label>Type</label>
          <Select
            size="small"
            name="headquarters_city_id"
            sx={{ width: "100%" }}
            inputProps={{ IconComponent: () => null }}
            // value={formData.headquarters_city_id || ""}
            // onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select model type
            </MenuItem>
            {modelTypes.map(type => (
              <MenuItem
                key={type}
                value={type}
              >
                { type }
              </MenuItem>
            ))}
          </Select>
          <div style={{ position: "absolute", top: 25, right: 1 }}>
            <ChevronDown />
          </div>
          {/* <p className="text-danger">
            {validation.headquarters_city_id}
          </p> */}
        </FormController>
        <FormController>
          <label>Current version</label>
          <input
            type="text"
            name="version"
          />
        </FormController>
      </Row>
      <Row>
        <FormController>
          <label>Description</label>
          <textarea
            placeholder="Enter text here"
            name="description"
            // onChange={handleChange}
            // value={formData.description}
          ></textarea>
          <span>{0}/800</span>
        </FormController>
      </Row>
    </>
  )
}

export default ModelInfo;
