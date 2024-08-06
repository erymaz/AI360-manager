import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const WapdropdownBox = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ebeaea;
  background: #fff;
  margin-top: 6px;
  position: absolute;
  width: 100%;
  z-index: 9;
`;

const WapdropdownSerach = styled.input`
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background: #fff;
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding: 8px 13px;
  width: 100%;
  :focus {
    outline: none;
  }
`;

const WapdropdownUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 30px;
  height: 180px;
  overflow: auto;
  margin-bottom: 20px;
`;

const WapdropdownLi = styled.li`
  border-radius: 6px;
  padding: 4px 19px;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  margin-bottom: 8px;
  :hover {
    background: #e6f0ff;
  }
`;

const WapdropdownCreate = styled.div`
  padding: 14px 0;
  border-top: 1px solid #ebeaea;

  width: 100%;
  bottom: 0;
  left: 0;
  position: relative;
`;

const WapdropdownCreateBtn = styled.button`
  color: #979797;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  border: none;
  background-color: transparent;
  padding: 0;
  padding-left: 21px;
  cursor: pointer;
  & span {
    font-size: 24px;
  }
`;

const WapdropdownCreatelabel = styled.label`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  width: 100%;
  display: block;
  margin-bottom: 12px;
`;

const WapdropdownCreateOpen = styled.div`
  padding-left: 21px;
  margin-top: 13px;
  padding-right: 10px;
  & .loader{
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const WapdropdownCreateInput = styled.input`
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding: 7px 8px;
  border: none;
  border-bottom: 1px solid #6a7381;
  width: 100%;
`;

const WapdropdownCreatebtns = styled.button`
  color: #609efa;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin: 0 auto;
  background: transparent;
  border: none;
  margin-top: 22px;
  cursor: pointer;
  display: block;
  width: auto;
  margin-right: 0;
`;

const ModalSelect = ({
  modalContent,
  handleSearchVal,
  handleSelect,
  handleAddNew,
  type,
  onClickOutside,
}: {
  type: any;
  modalContent: any;
  handleSelect?: (value: any, type: string) => void;
  handleSearchVal?: (value: any, type: string) => void;
  handleAddNew?: (value: any, type: string, callback?: any) => void;
  onClickOutside?: () => void;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    handleSearch;
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ onClickOutside ]);

  const handleChange = (e: any) => {
    const value = e.target && e.target.value;
    setContent(value);
  };

  const handleSearch = async (e: any) => {
    const value = e.target && e.target.value;
    if (handleSearchVal) {
      handleSearchVal(value, type);
    }
    setSearch(value);
  };

  const handleContent = async (value: any) => {
    if (handleSelect) {
      handleSelect(value, type);
    }
  };

  const handleAddContent = () => {
    if (!content) {
      setError(`${type} Required`);
    } else {
      setIsLoading(true);
      setError("");
      if (handleAddNew) {
        handleAddNew(content, type, callbackint);
      }
    }
  };

  const callbackint = (res: any) => {
    if (res.success) {
      setOpenMenu(false);
      setIsLoading(false);
      setContent("");
    } else {
      setIsLoading(false)
      setError(res.error);
    }
  };

  return (
    <WapdropdownBox ref={ref}>
      <WapdropdownSerach
        type="text"
        placeholder="search"
        onChange={handleSearch}
      />
      <WapdropdownUl>
        {modalContent?.length > 0 ? (
          modalContent.map((content: any, index: number) => {
            return (
              <WapdropdownLi
                key={index}
                onClick={() => handleContent(content)}
              >
                {content.name}
              </WapdropdownLi>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>{`Add a new ${type}`}</p>
        )}
      </WapdropdownUl>
      <WapdropdownCreate>
        {!openMenu ? (
          <WapdropdownCreateBtn onClick={() => setOpenMenu(!openMenu)}>
            <span>+</span> Create new {type}
          </WapdropdownCreateBtn>
        ) : (
          openMenu && (
            <WapdropdownCreateOpen>
              <WapdropdownCreatelabel>Name</WapdropdownCreatelabel>
              <div className="">
                {isLoading ? (
                  <span className="loader"> </span>
                ) : (
                  <span
                    className="wp-close-btn"
                    onClick={() => {
                      setOpenMenu(false);
                      setError("");
                    }}
                  ></span>
                )}
              </div>
              <WapdropdownCreateInput
                type="text"
                placeholder={`Enter new ${type} name.....`}
                onChange={handleChange}
                value={content}
              />
              <p className="text-danger">{error}</p>
              <WapdropdownCreatebtns type="button" onClick={handleAddContent}>
                Create
              </WapdropdownCreatebtns>
            </WapdropdownCreateOpen>
          )
        )}
      </WapdropdownCreate>
    </WapdropdownBox>
  );
};

export default ModalSelect;
