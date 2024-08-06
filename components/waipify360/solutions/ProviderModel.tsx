"use client";

import ProviderLogoUpload from "./ProviderLogoUpload";
import { Label } from "@/components/ui/label";
import { request } from "@/helpers/request";
import { errors } from "@/lib/config";
import { getProviderInfo } from "@/lib/services/provider-info";
import styled from "@emotion/styled";
import { Snackbar, Alert, Select, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";

const AddRecordModalContent = styled(Modal)`
  position: fixed;
  top: 0 !important;
  background: #fff;
  width: 969px;
  transform: unset !important;
  margin-right: 0 !important;
  inset: unset !important;
  right: 0 !important;
  padding: 30px;
  min-height: 100vh;
  overflow: auto;
`;
const DeleteModal = styled(Modal)`
  position: fixed;
  background: #fff;
  padding: 30px;
  overflow: auto;
  max-width: 500px;
  & .delete-close {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMjM4Nl8zNzMyNiIgdHJhbnNmb3JtPSJzY2FsZSgwLjAzMTI1KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzIzODZfMzczMjYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFBSUtBREFBUUFBQUFCQUFBQUlBQUFBQUNzaG1MekFBQUMyMGxFUVZSWUNjMlhTMnNVUVJESEV4K0pCdSt1NGtHdlF0U0RTRUF2QVJGZkJBVy9oRXJVZ3g4Z2VQSW1QcEFjRlB3QVlpRGdJUmNUSWNaclBBcmVWSkw0UUJBVkg2RCtmc3ZVME16TzdNNkd4YlhndjkxZDlhL3FtdTZ1bnRuQmdmb3lCSFVjVElBRFlEdG9BR1VWcklGbE1Bdm13VS9RRTNHU20rQXorRk1UY3ZXSkJPbVd5MkM1dXFrZDVuY0tYQUlqSU9RYm5VWHdCcXhreWgyMHU4QVJVT1RlUWpjRmZvRGFZdWJQUWZyRU00eFBnaTJnU3JUSmtadjZHcXZqYXNCcHlpaS9yMEVFV0tJLzFyUjA5Nk9QdmhISG1NWnVLeDZzZFBJN2pEZTE5V2h2MU5jWWFSS1ZLK0VwZjVhUUorbjNTb3dWU2JnZHcyV0JyeVVrVDNDdjVRWUJJNG5yeGVBdS9aZU1zRWk3c1Vqb3dkaVlUNEZKV0VrN1FTN3BQaDNLdGIzdkhDUmtyTUowaEhmdjQ1SjVHTXFTMXNOekc1d3BzWVhxTUoyN1lHOG9TdHBINkdJVnRtby9saWxVbmxKUklWZlJ5L2tOTHBSd2pxUDdEdVRjSzdHSHludENUajVmTEwvNzBzd29tSVYyRCtQM0lKelRLa2tuTndsdnhDcnhzdm9Lak9OcURTd0FCMDlBSjlrSDRRT0lKQzdUTDA1K29sTVE3SE5aRE10KzRHVTJlT0NnaHV5SDh4RkVFcjcxN0h2WHQ5dEN6TG5jcDZmUHF3MzhSRG04emMzdE95OHdId1dmTXRwbTJsL2dISGljNlRvMUt4bWhZUUxyRWUrTmtjVFJLOWUzNGJxazJ5MUk5OXhsaisyd09zN1h6Q0RmQXZrTHdQMm9jd2lMazUvR2J4Uzh5MkxVVFdJdTR6Y1BZZDB5OURNczZ0dzJQWERGSk01aXI1S1dNcXg3RVYwaG9pdmw1R1dsbGlZeFhUVTcrcGFMYUFobG5hdDRHN3lMd0RLc2t0MFkvSVJyVkJIUXQxekZjbU1iZk1KLy9qSXlnYjYvamsyaXJ4OGtKdUJac0N6Y0JqRUplaVhHaXJpVm4yUk8xdGVQMG5oYXl5bjlNbDVpUEJiR0xscDk5STBuTjZheGE0bGw1RktGcyswTXNJYTlTS3BFbXh5NXFhK3hTa3Z6di8xclJzSzVtTG1mNlhGWnBVOVcxWmVyVCtsVG84K2wzUXJrcEt4amxZeURDZUI3d1FNYkU2elNYd1BMWUJiTWcxcC96LzhDa01nSUwzdjhDeklBQUFBQVNVVk9SSzVDWUlJPSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 12px;
    right: 21px;
    cursor: pointer;
  }
  & p {
    padding-top: 20px;
    margin: 0;
    font-size: 16px;
    color: #000;
  }
  & .wap-delete-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
  }
  & .wap-delete-yes {
    background-color: #1f75ff;
    border: none;
    color: #fff;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
  }
  & .wap-delete-no {
    background-color: #c6cad2;
    border: none;
    color: #fff;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
  }
`;
const ModalCloseBtn = styled.button`
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMjM4Nl8zNzMyNiIgdHJhbnNmb3JtPSJzY2FsZSgwLjAzMTI1KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzIzODZfMzczMjYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFBSUtBREFBUUFBQUFCQUFBQUlBQUFBQUNzaG1MekFBQUMyMGxFUVZSWUNjMlhTMnNVUVJESEV4K0pCdSt1NGtHdlF0U0RTRUF2QVJGZkJBVy9oRXJVZ3g4Z2VQSW1QcEFjRlB3QVlpRGdJUmNUSWNaclBBcmVWSkw0UUJBVkg2RCtmc3ZVME16TzdNNkd4YlhndjkxZDlhL3FtdTZ1bnRuQmdmb3lCSFVjVElBRFlEdG9BR1VWcklGbE1Bdm13VS9RRTNHU20rQXorRk1UY3ZXSkJPbVd5MkM1dXFrZDVuY0tYQUlqSU9RYm5VWHdCcXhreWgyMHU4QVJVT1RlUWpjRmZvRGFZdWJQUWZyRU00eFBnaTJnU3JUSmtadjZHcXZqYXNCcHlpaS9yMEVFV0tJLzFyUjA5Nk9QdmhISG1NWnVLeDZzZFBJN2pEZTE5V2h2MU5jWWFSS1ZLK0VwZjVhUUorbjNTb3dWU2JnZHcyV0JyeVVrVDNDdjVRWUJJNG5yeGVBdS9aZU1zRWk3c1Vqb3dkaVlUNEZKV0VrN1FTN3BQaDNLdGIzdkhDUmtyTUowaEhmdjQ1SjVHTXFTMXNOekc1d3BzWVhxTUoyN1lHOG9TdHBINkdJVnRtby9saWxVbmxKUklWZlJ5L2tOTHBSd2pxUDdEdVRjSzdHSHludENUajVmTEwvNzBzd29tSVYyRCtQM0lKelRLa2tuTndsdnhDcnhzdm9Lak9OcURTd0FCMDlBSjlrSDRRT0lKQzdUTDA1K29sTVE3SE5aRE10KzRHVTJlT0NnaHV5SDh4RkVFcjcxN0h2WHQ5dEN6TG5jcDZmUHF3MzhSRG04emMzdE95OHdId1dmTXRwbTJsL2dISGljNlRvMUt4bWhZUUxyRWUrTmtjVFJLOWUzNGJxazJ5MUk5OXhsaisyd09zN1h6Q0RmQXZrTHdQMm9jd2lMazUvR2J4Uzh5MkxVVFdJdTR6Y1BZZDB5OURNczZ0dzJQWERGSk01aXI1S1dNcXg3RVYwaG9pdmw1R1dsbGlZeFhUVTcrcGFMYUFobG5hdDRHN3lMd0RLc2t0MFkvSVJyVkJIUXQxekZjbU1iZk1KLy9qSXlnYjYvamsyaXJ4OGtKdUJac0N6Y0JqRUplaVhHaXJpVm4yUk8xdGVQMG5oYXl5bjlNbDVpUEJiR0xscDk5STBuTjZheGE0bGw1RktGcyswTXNJYTlTS3BFbXh5NXFhK3hTa3Z6di8xclJzSzVtTG1mNlhGWnBVOVcxWmVyVCtsVG84K2wzUXJrcEt4amxZeURDZUI3d1FNYkU2elNYd1BMWUJiTWcxcC96LzhDa01nSUwzdjhDeklBQUFBQVNVVk9SSzVDWUlJPSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 12px;
  right: 21px;
  cursor: pointer;
`;
const ModalTitleNew = styled.h3`
  color: #1a262d;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-top: 0;
  margin-bottom: 30px;
  & span {
    color: #d7dbe0;
  }
`;
const WapIndustriesButsG = styled.div`
  padding-top: 15px;
  padding-bottom: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  border-top: 1px solid #ebeaea;
  position: absolute;
  bottom: 0;
  width: calc(100% - 60px);
  justify-content: space-between;
  & .btn-cancel {
    padding: 7px 19px;
    background-color: #c6cad2;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: 0.3s all ease;
    :hover {
      opacity: 0.7;
    }
    :focus {
      outline: none;
    }
  }
  & .btn-create {
    padding: 7px 19px;
    background-color: #1f75ff;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: 0.3s all ease;
    min-width: 128px;
    text-align: center;
    :hover {
      opacity: 0.7;
    }
    :focus {
      outline: none;
    }
  }
  & .wap-inner-button {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: end;
    width: 100%;
  }
  & .delete-entriy + .wap-inner-button {
    width: auto;
  }
`;
const LoaderTabs = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #1f75ff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;
const LoaderBox = styled.div`
  ::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;
const ProviderInput = styled.div`
  width: 246px;
  position: relative;
  & label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    margin-bottom: 4px;
    display: block;
  }
  & input {
    border: 1px solid #d7dbe0;
    padding: 8px 5px 8px 14px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #9ca5af;
    border-radius: 8px;
    width: 100%;
    :focus {
      outline: none;
    }
  }
  & .ai-magic {
    border: 1px solid #d7dbe0;
    border-radius: 8px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMzU1OV8yODIyMCIgdHJhbnNmb3JtPSJzY2FsZSgwLjAxNTYyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF8zNTU5XzI4MjIwIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFCQUNBWUFBQUNxYVhIZUFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUFBbHdTRmx6QUFBQnV3QUFBYnNCT3V6ajRnQUFBQmwwUlZoMFUyOW1kSGRoY21VQWQzZDNMbWx1YTNOallYQmxMbTl5WjV2dVBCb0FBQVpLU1VSQlZIaWM1WnRycUZWRkZNZC82MTV2dm0rbDVRTXplNkNsQm9VRnlxVVBpU1pwUlZBcHBXa3BQaXJCQWswa0tTR3hwSUpiUnBpcElFV0lCaUptWVZrK2c0SlFVM3ZRUTFMcFlscVdvWlhQdS9vd2MzRzM3OHplNSt3OSt4eWhCZlBoek9PLzF2cnZOYk5uMXV3anFrb0lFWkVwd0Z6Z0oyQ3lxdTRMQWx5d1NBZ0NSS1F2OERWUVo2czJxT3JJM01BVmtKcEFPSk01N3p6QUhTSnlUU0RzUWlVM0FTSlNBNHh6TkkzUGkxMEpDUkVCdzRCZWp2ci9EUUUrUjY4VmtZWUErSVZLTGdKRXBDTndiMEtYQ1hud0t5RjVJMkF1MERHaGZieUk5TStwbzFoUjFVd0ZHQUUwQXhvcEh3UEhZM1ZmQVIyeTZpbTZaSFcrSjNBazV1Z0pvRGZ3Vkt4ZWdSWFZkalFZQVVBdHNObmg1R3piWGdkODQyaC9wTnJPaGlMZ1JZZHp1NEc2U0oraHdMbFluNytBVzZydGNHWUNnRXVCdFE3bkR3TlhPZnJQY1BUOUIzaXMyazZYVFFBd0dOanZjV2hJd3JoRmpqRUtyQUxxcSsxOEtnR0FBRE9CMHc0blRnUDNwWXl2QWQ3MWtQQWpNT2lDSkFEb1lSM2Y0ekgrZCtDMkVxT25CbWowNEp3RzFnRDNSTmVRcWhBQXRBVkdBKzhEWnowR0svQUQwSzlzUlRBOUJmZFg0TlZLUjBXTGNST3RBVDdqMUs3cXJ3T1haRllHRGNDdUZEMEtiQVA2Vm9RQW9IdktrMUhnODFCUEJyT1BtQTc4a2FKemJTVUlxQUU2VzZPU1pDOG0xWlZiVlBVY0pncWFVcnAyQ2FFdlZleFRlWTNXRzVkNE9RSThuUFBwWHdZc3AvVVpJbDUrQVlhVmlOa1JlQUFZbkhrTnNFRDlnQVhBd1JUajNnTTZaM0QrVnBMWG1XWmdLekFKNkZRaVpnM3dSUVJqU21ZQ1lxRERnYmN4MjFlWHNYdUFQbVU0L3hCd3lvTzFENWdIWEoyQjFQc2RrZE1tRndFeEJmV1dDSmZoaHlsaFlRU2U4WXcvanNrbVNZNHB0ZDZCZTFjd0FpS0tKbm1pNFJEUU8ySGNOSS96dTRIcnNqcHVzYnNCWnh6WXE0TVRZQlVPeE9UKzR3cS9kTTFaNEhhUGdVdUFkbm1jdC9pelBlU2VCTG9GSjhBcTdZRDdSTGdtMXE4dmNDeldweGtZbjlkeGl6OGdZWDFTWUVPcFV5dUw4azdBZHc2bFl5SjlOanJhRndSeXZqMG16WmIwcGxKZ2JpRUVXQ051eEJ5Rm93cWJNSnVxTVE1anRnQzFBWnl2QTk1eDRDL0RiTlNpZFdlQnV3c2h3QnJ6cU1PUXBjRFBzYnJEUU04QXpsOEpmT2JRK2FrbFpwRGpvVFJqOWpaZTh2TWF0U29sRE04QnczUHFxTUdjVW84NjhBOUZ5Y1VjNmx4MmJNRnp1TXBMZ085VmxPbVZGTU1lQUN4MFJGUkxPUW8wT01ZdFRMQm5PekFGdURnSUFWYWhhelBTVXNyYWxFUklYWmNTV1R0dzVDRWpHQTlpMHZTKzhTZUFXYUVJY0MxNmlqazhsYlV0dFhqelVweGZUZ243Q09BRzRQc0VuR2JnaWhDWG8rdUFQeDMxSzFYMWJBYTh1cFQyWTVnVlBrMyt4dXdWZkNKQWJlNElzR3d2cFRYRE4yZkU2Z2xzY3VCRnkxYWdld0xHS0V6ZTBqZitGUEJza0NsZ0ZRNkpLZGdWQUxNQmVBTi81cWdKdU1reGJnNytmTU5lek5YZCtUZEhDQUtzNGxkc2FCN0JzVHJud0cyTFdibGRpOW9Cb0d1azcyaVA0enZ3M0VvRkk4QWEwSlVNQzErSjJOZmJKeGgzN2lQTVhxRS9yVyttRlpQSWJldkZMY0xZb2dybUhPQTZqRFVDMzhicW1vRnhxWmpWZGlvRENmV1lXNldrUlZLQkYwckJDL0tkWUtWRlJBWmh6Z1VYZWJwc0I0YXF5VUFuU3FqdkJKMGlJak5FWkp1SUxCQ1J0TlI3eWFLcU80SG5QYzFuZ0xHbE9OOENWbFNvRHVPL0lmbDRZUHhldUZQNVpWMm9GQmtCVDZiOHppV3EyZ1I4NG1oNnExeWdJcDcrNWJoUGlkNXZDVExxR1J2RC93MjQ2RUtJZ0NlQU5vNzZtWUgxck1ic0RWcGt2cXFlTGd1aGdLZnYrajRvV3FZRjF0Y0ZrN1lmQnRTVU96N29hMUJFQm1EbVpZK0ViaWVCVWFxNk9aamlIQkpzQ29qSUJNdzlYZHo1RDJLLzJ3RWJSV1NPaUVnby9aa2xaL2pWWThKdksrNXdYMm43emZlMDc4U3NGeVZmWkFTZnNqbWNuMFZ5MnVsRG9MM3RLOENiQ1gzUEFDOVQwRUVxT0FHWXEvU2tmZmdpSEtsb3pGNGc2V3VVT3l0TlFOWTFvRk5DbXdMNzFiMFZQWWpKeG1UQkxVWnlUSUZsSkgvcHNaeklhd2w0T3FYL2V1eVV1ZUNuUU1TcGdaaHZoNXM4VHIxayswMzF0QjhGRmhNd2cxUlJBaUpFMUdKT1o2NG4zSWo3UzlNVlhBRC9Jd2dMQmlOSmZqT29KV2xxdFIwdmhBQkxRdnlBRWkvUFZkdnBRZ213SkN6eE9MK0pEUHYxSWtzaEtURVI2WU81cjQ5dmRVZW82c2JnQ25OSUljZGhWVDJBK2Q0M0tvZHdKekNxS2tWbWhCYkhmaTlSMWVZQzlXV1NRclBDSXRLSXVhcmVERXhVMVpPRktjc28vd0pVQ3o3Z2tlbzFWQUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;
const ProviderMainRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
  gap: 12px;
  & label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    margin-bottom: 4px;
    display: block;
  }
`;
const ModalInnerContent = styled.div`
  overflow: auto;
  max-height: calc(100vh - 180px);
`;
const ProviderDelete = styled.button`
  background: transparent;
  padding: 9px 16px;
  color: #dd7545;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const ProviderInputIS = styled.div`
  margin-top: 15px;
  width: 100%;
  max-width: 619px;
  margin-bottom: 15px;
  & label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    margin-bottom: 4px;
    display: block;
  }
  & input {
    border: 1px solid #d7dbe0;
    padding: 8px 5px 8px 14px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #9ca5af;
    border-radius: 8px;
    width: 100%;
    max-width: 508px;
    :focus {
      outline: none;
    }
  }
  & textarea {
    border: 1px solid #d7dbe0;
    padding: 8px 5px 8px 14px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #9ca5af;
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
`;
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "99",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const customStylesTwo = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "99",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
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
type Country = {
  id?: string;
  en: string;
  iso2: string;
  iso3: string;
  flag: string;
  de: string;
  es: string;
};

function CreateNewProvider({
  open,
  impOrganization,
  handleCaseModel,
  provider_id,
}: {
  open: boolean;
  impOrganization: any;
  handleCaseModel: (value: boolean, type?: boolean) => void;
  provider_id: String | null;
}) {
  const [showError, setShowError] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [validation, setValidation] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [successAlert, setSuccessAlert] = useState<any>(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!countries.length) {
      loadCountry();
    }
  }, []);

  useEffect(() => {
    if (provider_id) {
      getProvider();
    }
  }, [provider_id]);

  const loadCountry = useCallback(() => {
    request<{ countries?: any }>(`/api/impact360/countries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res) {
        setCountries(res?.countries);
      }
    });
  }, [countries]);

  const getProvider = useCallback(() => {
    setIsLoading(true);
    request<{ provider?: any }>(`/api/impact360/provider?id=${provider_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res: any) => {
      if (res) {
        const providerDetails = res.providers[0];
        setFormData({
          ...formData,
          description: providerDetails.description,
          headquarters_address_line: providerDetails.headquarters_address_line,
          headquarters_address_number:
            providerDetails.headquarters_address_number,
          headquarters_city_id: providerDetails.headquarters_city_id,
          headquarters_country_id: providerDetails.headquarters_country_id,
          headquarters_zip_code: providerDetails.headquarters_zip_code,
          logo: providerDetails.logo,
          name: providerDetails.name,
          type: providerDetails.type,
        });
        setIsLoading(false);
      }
    });
  }, [provider_id]);

  const handleCloseModel = (type?: boolean) => {
    setValidation({});
    setFormData({});
    handleCaseModel(false, type);
  };

  const validate = () => {
    let error = false;
    let errObj: any = {};
    if (!formData.name) {
      error = true;
      errObj["name"] = errors.reruired;
    }
    return { error, errObj };
  };

  const onSubmit = async () => {
    let { error, errObj } = validate();

    if (error) {
      setValidation({
        ...validation,
        ...errObj,
      });
      return;
    }
    setIsLoading(true);
    if (provider_id) {
      await request(`/api/impact360/provider/${provider_id}`, {
        method: "PUT",
        body: formData,
      })
        .then((res: any) => {
          if (res) {
            setIsLoading(false);
            handleCloseModel(true);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      await request(`/api/impact360/provider`, {
        method: "POST",
        body: {
          ...formData,
          organization_id: impOrganization.id,
        },
      })
        .then((res: any) => {
          if (res) {
            setIsLoading(false);
            handleCloseModel(true);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name) {
      setValidation({
        ...validation,
        [name]: "",
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogoChange = (logourl: string | null) => {
    setFormData({
      ...formData,
      logo: logourl,
    });
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    request(`/api/impact360/provider/${provider_id}`, {
      method: "DELETE",
      body: formData,
    }).then((res: any) => {
      if (res) {
        setDeleteLoading(false);
        handleCloseModel(true);
        setIsOpen(false);
      }
    });
  };

  const handleAIMagic = async () => {
    if (!formData.name) {
      return;
    }
    setIsLoading(true);
    const res = await getProviderInfo(formData.name);
    if (res) {
      const { address, city, country, zipCode, name, description, logo } = res;
      const _country = countries.find((_) => _.en == country);
      setValidation({
        ...validation,
        name: "",
        description: "",
        headquarters_address_line: "",
        headquarters_zip_code: "",
        headquarters_city_id: "",
        headquarters_country_id: _country ? "" : "Required",
      });

      setFormData({
        ...formData,
        name,
        description,
        headquarters_address_line: address,
        headquarters_zip_code: zipCode,
        headquarters_city_id: city,
        headquarters_country_id: _country?.id,
        logo,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <AddRecordModalContent
        isOpen={open}
        onRequestClose={() => handleCloseModel(false)}
        style={customStyles}
      >
        {isLoading && (
          <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)]">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primaryColor motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="z-20 !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
        <ModalTitleNew>
          {provider_id ? "Update Provider" : "Create Provider"}
        </ModalTitleNew>
        <ModalCloseBtn onClick={() => handleCloseModel(false)}></ModalCloseBtn>

        <ModalInnerContent>
          <div className="add-provider">
            <ProviderMainRow>
              <ProviderInput>
                <Label
                  htmlFor="business_function"
                  className="text-labelGray text-xs font-normal leading-6 block"
                >
                  Provider
                  <span className="text-required text-xs font-normal leading-6">
                    *
                  </span>
                </Label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <p className="text-required text-xs leading-6 font-normal absolute left-0 -bottom-5">
                  {validation.name}
                </p>
              </ProviderInput>

              <ProviderInput>
                <div style={{ width: "100%", position: "relative" }}>
                  <label>Type</label>
                  <Select
                    size="small"
                    name="type"
                    sx={{ width: "100%" }}
                    inputProps={{ IconComponent: () => null }}
                    value={formData.type || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="AI Solutions">AI Solutions</MenuItem>
                    <MenuItem value="Incumbent">Incumbent</MenuItem>
                    <MenuItem value="AI Foundational Models">
                      AI Foundational Models
                    </MenuItem>
                    <MenuItem value="AI Solutions Consulting">
                      AI Solutions Consulting
                    </MenuItem>
                    <MenuItem value="AI Models & Solutions">
                      AI Models & Solutions
                    </MenuItem>
                    <MenuItem value="AI Platform & Solutions">
                      AI Platform & Solutions
                    </MenuItem>
                    <MenuItem value="AI Models, Solutions and Platform">
                      AI Models, Solutions and Platform
                    </MenuItem>
                    <MenuItem value="Platform">Platform</MenuItem>
                  </Select>
                  <div style={{ position: "absolute", top: 25, right: 1 }}>
                    <ChevronDown />
                  </div>
                  <p className="text-danger">{validation.type}</p>
                </div>
              </ProviderInput>

              <ProviderInput>
                <label>AI Magic</label>
                <div
                  className="ai-magic cursor-pointer"
                  onClick={handleAIMagic}
                />
              </ProviderInput>
            </ProviderMainRow>

            <div className="mt-6">
              <ProviderLogoUpload
                onChange={(url: string | null) => handleLogoChange(url)}
                logoUrl={formData.logo || ""}
              />
            </div>

            <ProviderInputIS>
              <label>Description</label>
              <textarea
                placeholder="Enter text here"
                name="description"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
              <span>{formData?.description?.length || 0}/800</span>
            </ProviderInputIS>
            <ProviderInputIS>
              <label>Headquarters Address line 1</label>
              <input
                type="text"
                name="headquarters_address_line"
                value={formData.headquarters_address_line}
                onChange={handleChange}
              />
            </ProviderInputIS>
            <ProviderInputIS>
              <label>Headquarters Address line 2</label>
              <input
                type="text"
                name="headquarters_address_number"
                value={formData.headquarters_address_number}
                onChange={handleChange}
              />
            </ProviderInputIS>
            <ProviderMainRow>
              <ProviderInput>
                <label>Zip code</label>
                <input
                  type="text"
                  name="headquarters_zip_code"
                  value={formData.headquarters_zip_code}
                  onChange={handleChange}
                />
              </ProviderInput>
              <ProviderInput>
                <div style={{ width: "100%", position: "relative" }}>
                  <label>City</label>
                  <input
                    type="text"
                    name="headquarters_city_id"
                    value={formData.headquarters_city_id}
                    onChange={handleChange}
                  />
                  <p className="text-danger">
                    {validation.headquarters_city_id}
                  </p>
                </div>
              </ProviderInput>
            </ProviderMainRow>
            <ProviderMainRow>
              <ProviderInput>
                <div style={{ width: "100%", position: "relative" }}>
                  <label>Country</label>
                  <Select
                    size="small"
                    sx={{ width: "100%" }}
                    name="headquarters_country_id"
                    inputProps={{ IconComponent: () => null }}
                    value={formData.headquarters_country_id || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select if country specific
                    </MenuItem>
                    {countries.map((country, index) => (
                      <MenuItem value={country.id} key={index}>
                        {`${country?.flag} ${country?.en}`}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ position: "absolute", top: 25, right: 1 }}>
                    <ChevronDown />
                  </div>
                  <p className="text-danger">
                    {validation.headquarters_country_id}
                  </p>
                </div>
              </ProviderInput>
            </ProviderMainRow>
            <ProviderInputIS>
              <label>Provider web url</label>
              <input type="text" />
            </ProviderInputIS>
            <ProviderInputIS>
              <label>Provider privacy policy url</label>
              <input type="text" />
            </ProviderInputIS>
            <ProviderInputIS>
              <label>Provider terms & conditions url</label>
              <input type="text" />
            </ProviderInputIS>
            <ProviderInputIS>
              <label>Provider responsible AI policy url</label>
              <input type="text" />
            </ProviderInputIS>
          </div>
          <WapIndustriesButsG>
            {provider_id && (
              <ProviderDelete
                className="delete-entriy"
                type="button"
                onClick={() => setIsOpen(true)}
              >
                Delete this record
              </ProviderDelete>
            )}
            <div className="wap-inner-button">
              <button
                className="btn-cancel"
                onClick={() => handleCloseModel(false)}
              >
                Cancel
              </button>
              <button className="btn-create" type="button" onClick={onSubmit}>
                {provider_id ? "Update Provider" : "Create Provider"}
              </button>
            </div>
          </WapIndustriesButsG>
        </ModalInnerContent>

        <Snackbar
          open={!!successAlert}
          autoHideDuration={3000}
          onClose={() => setSuccessAlert(undefined)}
        >
          <Alert severity="success">{successAlert}</Alert>
        </Snackbar>
        <Snackbar
          open={!!showError}
          autoHideDuration={3000}
          onClose={() => setShowError(undefined)}
        >
          <Alert severity="error">{showError}</Alert>
        </Snackbar>
      </AddRecordModalContent>

      <DeleteModal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStylesTwo}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="delete-close"
        ></button>
        <p>
          Are you sure you want to delete this provider? The solutions, models,
          and mentions in your reports will be deleted?
        </p>

        <div className="wap-delete-btns">
          <button
            type="button"
            className="wap-delete-yes"
            onClick={handleDelete}
          >
            {deleteLoading && <span className="loader"></span>} Yes
          </button>
          <button
            type="button"
            className="wap-delete-no"
            onClick={() => setIsOpen(false)}
          >
            No
          </button>
        </div>
      </DeleteModal>
    </>
  );
}

export default CreateNewProvider;
