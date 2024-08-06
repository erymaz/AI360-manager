import styled from "@emotion/styled";
import { Snackbar, Alert, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { taskRisks } from "@/helpers/tasks";
import { request } from "@/helpers/request";

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
const WapCreateUseForm = styled.div`
  display: flex;
  // flex-wrap: wrap;
  gap: 35px;
  max-width: 680px;
  width: 100%;
  margin-bottom: 30px;
  & span {
    color: #6a7381;
  }
`;
const WapCreateUseLabelLeft = styled.div`
  width: 50px;
  & h6 {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    margin-top: 0;
    margin-bottom: 7px;
  }
  & p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #9ca5af;
    margin: 0;
    margin-top: 27px;
  }
  & h6 + p {
    margin-top: 0px;
  }
`;
const WapCreateUseInputRightG = styled.div`
  width: calc(100% - 85px);
  & label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #6a7381;
    display: block;
    margin-bottom: 4px;
  }
  & input {
    padding: 8px 13px 8px 11px;
    border-radius: 8px;
    border: 1px solid #d7dbe0;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #000;
    :placeholder {
      color: #9ca5af;
    }
    :focus {
      outline: none;
    }
  }
`;
const WapIndustriesDescription = styled.div`
  position: relative;
  max-width: 680px;
  width: 100%;
  margin-bottom: 30px;
  & textarea {
    padding: 8px 13px;
    border-radius: 8px;
    border: 1px solid #d7dbe0;
    width: 100%;
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    height: 88px;
    :placeholder {
      color: #9ca5af;
    }
    :focus {
      outline: none;
    }
    & label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #6a7381;
      display: block;
      margin-bottom: 4px;
    }
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
  justify-content: end;
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

function CreateNewSubcase({
  open,
  impOrganization,
  setIsOpen,
  subcaseId
}: {
  open: boolean;
  impOrganization: any;
  setIsOpen: (value: boolean) => void;
  subcaseId: string | null;
}) {
  const [showError, setShowError] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [validation, setValidation] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useCases, setUseCases] = useState<any[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [subcase, setSubcase] = useState<any>({});
  const [successAlert, setSuccessAlert] = useState<any>(false);

  useEffect(() => {
    if (open) {
      if (subcaseId) {
        getSubcase(subcaseId);
      }
      getCases();
      loadCountry();
    }
  }, [open, subcaseId]);

  const getSubcase = async(id: string) => {
    setIsLoading(true);
    const url = `/api/impact360/subcases?id=${id}`;
    request<{ subcases?: any }>(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res: any) => {
      if (res) {
        const _subcase = res.subcases[0] || {};
        setSubcase(_subcase);
        const validationObj: Record<string, string> = {};
        const formDataObj: any = {};
        if (_subcase?.case_id) {
          validationObj["case_id"] = "";
          formDataObj["case_id"] = _subcase?.case_id;
        }
        if (_subcase?.name) {
          validationObj["name"] = "";
          formDataObj["name"] = _subcase?.name;
        }
        if (_subcase?.country_id) {
          formDataObj["country_id"] = _subcase?.country_id;
        }
        // if (_subcase?.region_id) {
        //   formDataObj["region_id"] = _subcase?.region_id;
        // }
        if (_subcase?.description) {
          formDataObj["description"] = _subcase?.description;
        }
        setValidation(validationObj);
        setFormData(formDataObj);
      }
      setIsLoading(false);
    });
  }

  const getCases = async() => {
    setIsLoading(true);
    const url = `/api/impact360/cases?organization_creator_id=${impOrganization?.creator_id}`;
    request<{ cases?: any }>(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res: any) => {
      if (res) {
        setUseCases(res.cases);
      }
      setIsLoading(false);
    });
  }

  const loadCountry = async () => {
    await request<{ countries?: any }>(`/api/impact360/countries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res) {
        setCountries(res?.countries);
      }
    });
  }

  const handleParamChange = (value: any, type?: string) => {
    if (type) {
      setValidation({
        ...validation,
        [type]: "",
      });
    }
    setFormData({
      ...formData,
      ...value,
    });
  };

  const handleCloseModel = () => {
    setValidation({});
    setFormData({});
    setUseCases([]);
    setIsOpen(false);
  };

  const validate = () => {
    let error = false;
    let errObj: any = {};
    if (!formData.case_id) {
      error = true;
      errObj["case_id"] = "Please select usecase";
    }
    if (!formData.name) {
      error = true;
      errObj["name"] = "Please input name";
    }
    return { error, errObj };
  }

  const onSubmit = async() => {
    let { error, errObj } = validate();
    if (error) {
      setValidation({
        ...validation,
        ...errObj,
      });
      return;
    }

    setIsLoading(true);
    if (subcaseId) {
      await request(`/api/impact360/subcases/${formData.case_id}/${subcaseId}`, {
        method: "PUT",
        body: {
          name: formData.name,
          country_id: formData.country_id || null,
          region_id: null,
          description: formData.description || "",
        },
      })
        .then((res: any) => {
          setIsLoading(false);
          handleCloseModel();
        })
    } else {
      await request(`/api/impact360/subcases/${formData.case_id}`, {
        method: "POST",
        body: {
          name: formData.name,
          region_id: null,
          country_id: formData.country_id || null,
          organization_id: impOrganization.id,
          description: formData.description || "",
        },
      })
        .then((res: any) => {
          setIsLoading(false);
          handleCloseModel();
        })
    }
  }

  return (
    <AddRecordModalContent
      isOpen={open}
      onRequestClose={handleCloseModel}
      style={customStyles}
    >
      {isLoading && (
        <LoaderBox>
          <LoaderTabs></LoaderTabs>
        </LoaderBox>
      )}
      <ModalTitleNew>
        {subcaseId ? (
          "Update Subcase"
        ) : (
          "Create Subcase"
        )}
      </ModalTitleNew>
      <ModalCloseBtn onClick={handleCloseModel}></ModalCloseBtn>

      <div>
        <WapIndustriesDescription>
          <label>Use Case/Outcome</label>
          <Select
            size="small"
            sx={{ width: '100%' }}
            inputProps={{ IconComponent: () => null }}
            value={formData.case_id || ""}
            onChange={(e) => handleParamChange({case_id: e.target.value}, "case_id")}
          >
            <MenuItem value="" disabled>Please Select Usecase</MenuItem>
            {useCases?.map((cs, index) =>
              <MenuItem value={cs.id} key={index}>
                {cs.name}
              </MenuItem>
            )}
          </Select>
          <div style={{ position: 'absolute', top: 25, right: 1 }}>
            <ChevronDown />
          </div>
          <p className="text-danger">{validation.case_id}</p>
        </WapIndustriesDescription>
        <WapCreateUseForm>
          <WapCreateUseLabelLeft>
            <h6>Locale</h6>
            <p>en_US</p>
          </WapCreateUseLabelLeft>
          <WapCreateUseInputRightG>
            <label>Subcase/Sub-outcome name</label>
            <input
              type="text"
              placeholder="Enter name...."
              value={formData.name || ""}
              onChange={(e) => handleParamChange({name: e.target.value}, "name")}
            />
            <p className="text-danger">{validation.name}</p>
          </WapCreateUseInputRightG>
        </WapCreateUseForm>
        <WapCreateUseForm>
          <WapCreateUseLabelLeft>
            <p>en_DE</p>
          </WapCreateUseLabelLeft>
          <WapCreateUseInputRightG>
            <label>Subcase name translation</label>
            <input
              type="text"
              placeholder="Enter Translation...."
              value={formData.name || ""}
              onChange={(e) => handleParamChange({name: e.target.value}, "name")}
            />
          </WapCreateUseInputRightG>
        </WapCreateUseForm>
        <WapCreateUseForm>
          <div style={{ width: '100%', position: 'relative' }}>
            <span>Country</span>
            <Select
              size="small"
              sx={{ width: '100%' }}
              inputProps={{ IconComponent: () => null }}
              value={formData.country_id || ""}
              onChange={(e) => handleParamChange({country_id: e.target.value}, "country_id")}
            >
              <MenuItem value="" disabled>Select if country specific</MenuItem>
              {countries.map((country, index) =>
                <MenuItem value={country.id} key={index}>
                  {`${country?.flag} ${country?.en}`}
                </MenuItem>
              )}
            </Select>
            <div style={{ position: 'absolute', top: 25, right: 1 }}>
              <ChevronDown />
            </div>
            <p className="text-danger">{validation.country_id}</p>
          </div>
          {/* <div style={{ width: '100%', position: 'relative' }}>
            <span>Region</span>
            <Select
              size="small"
              sx={{ width: '100%' }}
              inputProps={{ IconComponent: () => null }}
              value={formData.region_id || ""}
              onChange={(e) => handleParamChange({region_id: e.target.value}, "region_id")}
            >
              <MenuItem value="" disabled>Select if region specific</MenuItem>
              {taskRisks.map((risk, index) =>
                <MenuItem value={risk} key={index}>
                  {risk}
                </MenuItem>
              )}
            </Select>
            <div style={{ position: 'absolute', top: 25, right: 1 }}>
              <ChevronDown />
            </div>
            <p className="text-danger">{validation.region_id}</p>
          </div> */}
        </WapCreateUseForm>
        <WapIndustriesDescription>
          <label>Description</label>
          <textarea
            placeholder="Enter a description if you think the name is not explicative enough..."
            value={formData.description || ""}
            onChange={(e) => handleParamChange({description: e.target.value})}
          />
        </WapIndustriesDescription>
        <WapIndustriesButsG>
          <button className="btn-cancel" onClick={handleCloseModel}>Cancel</button>
          <button className="btn-create" onClick={onSubmit}>
            {subcaseId ? (
              "Update Subcase"
            ) : (
              "Create Subcase"
            )}
          </button>
        </WapIndustriesButsG>
      </div>

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
  );
}
export default CreateNewSubcase;
