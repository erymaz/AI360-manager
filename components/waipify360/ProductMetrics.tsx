import ModalSelect from "./ModalSelect";
import styled from "@emotion/styled";
import next from "next";

const ProductMetricsWraper = styled.div`
  margin-top: 18px;
`;
const ProductMetricsP = styled.p`
  color: #9ca5af;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const ProductMetricsHs = styled.h6`
  color: #000;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 34px;
  margin-bottom: 31px;
`;
const ProductMetricsHsL = styled.h6`
  color: #000;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 34px;
  margin-bottom: 0px;
`;

const ProductMetricsLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;
const ProductMetricsLabel = styled.label`
  color: #6a7381;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 4px;
  display: block;
`;

const ProductMetricsInput = styled.input`
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background: #fff;
  padding: 7px 13px;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  max-width: 164px;
  :focus {
    outline: none;
  }
`;
const ProductMetricsGroup = styled.div`
  width: 28%;
`;

const ProductMetricsBtnGroup = styled.div`
  margin-top: 33px;
`;
const ProductMetricsBtn = styled.button`
  color: #979797;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 4px;
  & span {
    font-size: 24px;
  }
  :hover {
    color: #1f75ff;
  }
`;
const ProductMetricsInnerGroup = styled.div`
  position: relative;
`;

const ProductMetricsDaySpan = styled.span`
  position: absolute;
  right: 13px;
  top: 33px;
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const ProductMetrics = () => {
  return (
    <>
      <ProductMetricsWraper>
        <ProductMetricsP>
          Sometimes it’s not easy to quantify just with a business economic
          value. In some cases the impact will be more easy to understand by
          using product metrics. Add them here
        </ProductMetricsP>

        <ProductMetricsHs>
          OUTPUT METRICS (main product outcome metric)
        </ProductMetricsHs>

        <ProductMetricsLine>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Metric</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
          <div>
            <ProductMetricsLabel>Baseline value</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
          </div>
          <div>
            <ProductMetricsLabel>Goal value with AI</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
          </div>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Comparison period</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
        </ProductMetricsLine>
        <ProductMetricsLine>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Metric</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
          <div>
            <ProductMetricsLabel>Baseline value</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
          </div>
          <div>
            <ProductMetricsLabel>Goal value with AI</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
          </div>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Comparison period</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
        </ProductMetricsLine>
        <ProductMetricsBtnGroup>
          <ProductMetricsBtn>
            <span>+</span> add more
          </ProductMetricsBtn>
        </ProductMetricsBtnGroup>

        <ProductMetricsHs>INPUT METRICs (early indicators) </ProductMetricsHs>
        <ProductMetricsLine>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Metric</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
          <ProductMetricsInnerGroup>
            <ProductMetricsLabel>Baseline value</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
            <ProductMetricsDaySpan>days</ProductMetricsDaySpan>
          </ProductMetricsInnerGroup>
          <ProductMetricsInnerGroup>
            <ProductMetricsLabel>Goal value with AI</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
            <ProductMetricsDaySpan>days</ProductMetricsDaySpan>
          </ProductMetricsInnerGroup>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Comparison period</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
        </ProductMetricsLine>
        <ProductMetricsBtnGroup>
          <ProductMetricsBtn>
            <span>+</span> add more
          </ProductMetricsBtn>
        </ProductMetricsBtnGroup>

        <ProductMetricsHsL>SANITY METRIC</ProductMetricsHsL>
        <ProductMetricsP>
          Under no circumstances the implementation of the AI solution must
          impact this metric negatively
        </ProductMetricsP>
        <ProductMetricsLine>
          <ProductMetricsGroup>
            <ProductMetricsLabel>Metric</ProductMetricsLabel>
            <ModalSelect modalContent={[]} type="case" />
          </ProductMetricsGroup>
          <ProductMetricsInnerGroup>
            <ProductMetricsLabel>Baseline value</ProductMetricsLabel>
            <ProductMetricsInput type="number" />
            <ProductMetricsDaySpan>days</ProductMetricsDaySpan>
          </ProductMetricsInnerGroup>
        </ProductMetricsLine>
        <ProductMetricsBtnGroup>
          <ProductMetricsBtn>
            <span>+</span> add more
          </ProductMetricsBtn>
        </ProductMetricsBtnGroup>
      </ProductMetricsWraper>
    </>
  );
};

export default ProductMetrics;
