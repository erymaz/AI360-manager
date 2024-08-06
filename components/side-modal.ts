import Modal from "react-modal";
import styled from "@emotion/styled";

export const AddRecordModalContent = styled(Modal)`
  position: fixed;
  top: 0 !important;
  background: #fff;
  max-width: 880px;
  width: 100%;
  transform: unset !important;
  margin-right: 0 !important;
  inset: unset !important;
  right: 0 !important;
  padding: 20px;
  min-height: 100vh;
  overflow: auto;
  height: 100%;
`;

export const DeleteModal = styled(Modal)`
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

export const ModalTitle = styled.h3`
  color: #0F172A;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  font-family: 'Inter',sans-serif;
  margin-top: 0;
  & span {
    color: #d7dbe0;
  }
`;

export const ModalCloseBtn = styled.button`
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

export const ModalTabContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
  border-bottom: 1px solid #d7dbe0;
`;

export const ModalTab = styled.a`
padding: 8px 12px;
color: #3e4856;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px;
text-decoration: none;
display: inline-block;
border-bottom: 2px solid transparent;
transition: 0.3s all ease;
cursor: pointer;
&.active {
  color: #1f75ff;
  border-bottom: 2px solid #1f75ff;
}
:hover {
  color: #1f75ff;
  border-bottom: 2px solid #1f75ff;
}
`;

export const ModalTabContent = styled.div`
  height: 150px;
  overflow: auto;
  padding-bottom: 100px;
  padding-top: 20px;
`;

export const AddRecordModalFooter = styled.div`
  padding-top: 15px;
  border-top: 1px solid #f5f5f5;
  text-align: end;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 60px);
  background: #fff;
  display: flex;
  justify-content: end;
`;

export const ModalCancel = styled.button`
  border-radius: 8px;
  background: #c6cad2;
  padding: 9px 16px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  border: none;
  cursor: pointer;
`;

export const ModalSubmit = styled.button`
  border-radius: 8px;
  background: #1f75ff;
  padding: 9px 12px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  border: none;
  cursor: pointer;
  margin-left: 6px;
`;

export const DeleteRecord = styled.button`
  background: transparent;
  padding: 9px 16px;
  color: #dd7545;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border: none;
  cursor: pointer;
  width: calc(100% - 213px);
  display: flex;
align-items: center;
`;
