import { request } from "@/helpers/request";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";

import {
  AddRecordModalContent,
  DeleteModal,
  ModalCloseBtn,
  ModalTitle,
  ModalTabContainer,
  ModalTab,
  ModalTabContent,
  AddRecordModalFooter,
  ModalSubmit,
  ModalCancel,
  DeleteRecord,
} from "@/components/side-modal";
import ModelInfo from "./ModelInfo";
import Capabilities from "./Capabilities";

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

const headerTabs = [
  "Model Info",
  "Capabilities",
  "Specifications",
  "Costs",
  "Tasks using this model",
];

function CreateNewModel({
  open,
  setIsOpen,
  impOrganization,
  modelId,
  isEdit,
}: {
  open: boolean;
  setIsOpen: (value: boolean, type?: boolean) => void;
  impOrganization: any;
  modelId: String | null;
  isEdit: boolean
}) {
  const [showError, setShowError] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [validation, setValidation] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<any>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modelId) {
      // getProvider();
    }
  }, [modelId]);

  const handleCloseModal = () => {
    setValidation({});
    setFormData({});
    setIsOpen(false);
  };

  const handleTabChange = async (
    index: number,
    tabcheck: boolean,
    event?: any
  ) => {
    setTabIndex(index);
  }

  const handleDelete = () => {
    setDeleteLoading(true);
    request(`/api/impact360/models/${modelId}`, {
      method: "DELETE",
      body: formData,
    }).then((res: any) => {
      if (res) {
        setDeleteLoading(false);
        handleCloseModal();
        setOpenDeleteModal(false);
      }
    });
  };

  return (
    <>
      <AddRecordModalContent
        isOpen={open}
        onRequestClose={() => handleCloseModal()}
        style={customStyles}
      >
        {isLoading && (
          <LoaderBox>
            <LoaderTabs></LoaderTabs>
          </LoaderBox>
        )}
        <ModalTitle>
          {modelId ? "Update Model" : "Add Model"}
        </ModalTitle>
        <ModalCloseBtn onClick={() => handleCloseModal()}></ModalCloseBtn>

        <ModalTabContainer>
          {headerTabs.map(
            (head: string, index: number) =>
              head !== "Product Metrics" && (
                <li key={index}>
                  <ModalTab
                    onClick={(event) => handleTabChange(index, true, event)}
                    className={`${tabIndex === index ? "active" : ""}`}
                  >
                    {head}
                    {tabIndex === index && isTabLoading ? (
                      <span className="loader"></span>
                    ) : (
                      ""
                    )}
                  </ModalTab>
                </li>
              )
          )}
        </ModalTabContainer>

        <ModalTabContent>
          {tabIndex === 0 && <ModelInfo />}
          {tabIndex === 1 && <Capabilities />}
        </ModalTabContent>

        <AddRecordModalFooter>
          {isEdit && (
            <DeleteRecord
              className="delete-entriy"
              type="button"
            >
              Delete this record
            </DeleteRecord>
          )}
          <div>
            <ModalCancel type="button" onClick={handleCloseModal}>
              Cancel
            </ModalCancel>
            {isEdit ? (
              <ModalSubmit type="button">
                Update Model
              </ModalSubmit>
            ) : (
              <ModalSubmit type="button">
                Create Model
              </ModalSubmit>
            )}
          </div>
        </AddRecordModalFooter>
      </AddRecordModalContent>

      <DeleteModal
        isOpen={openDeleteModal}
        onRequestClose={() => setOpenDeleteModal(false)}
        style={customStylesTwo}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => setOpenDeleteModal(false)}
          className="delete-close"
        ></button>
        <p>
          Are you sure you want to delete this model?
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
            onClick={() => setOpenDeleteModal(false)}
          >
            No
          </button>
        </div>
      </DeleteModal>
    </>
  );
}

export default CreateNewModel;
