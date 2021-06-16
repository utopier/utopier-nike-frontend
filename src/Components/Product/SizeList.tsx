import React from 'react';
import styled from 'styled-components';

const SizeListWapper = styled.div`
  span {
    display: inline-block;
    margin: 2px;
    padding-top: 10px;
    width: 71px;
    height: 47px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    text-align: center;
  }
  span:hover {
    border-color: #111;
  }
  label {
    line-height: 20px;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
  }
`;

const SizeListHeader = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  strong {
    font-weight: 600;
  }
  a {
    font-size: 13px;
    color: #aeaeae;
  }
`;

const SizeList : React.FC = () => {
  return (
    <>
      <div>
        <SizeListHeader>
          <div>
            <strong>사이즈 선택</strong>
          </div>
          <div>
            <a>사이즈 가이드 </a>
          </div>
        </SizeListHeader>
        <SizeListWapper>
          <div className="opt-list">
            <span className="input-radio" >
              <label className="sd-out">230</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="230"
                data-value="230"
                id="FW_SIZE1"
                name="SIZE"
                disabled={true}
                value="28"
              />
            </span>
            <span className="input-radio" >
              <label className="sd-out">234</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="234"
                data-value="234"
                id="FW_SIZE1"
                name="SIZE"
                disabled={true}
                value="29"
              />
            </span>
            <span className="input-radio" >
              <label className="sd-out">235</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="235"
                data-value="235"
                id="FW_SIZE1"
                name="SIZE"
                disabled={true}
                value="30"
              />
            </span>
            <span className="input-radio" >
              <label className="">240</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="240"
                data-value="240"
                id="FW_SIZE1"
                name="SIZE"
                value="35"
              />
            </span>
            <span className="input-radio" >
              <label className="">245</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="245"
                data-value="245"
                id="FW_SIZE1"
                name="SIZE"
                value="36"
              />
            </span>
            <span className="input-radio">
              <label className="">250</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="250"
                data-value="250"
                id="FW_SIZE1"
                name="SIZE"
                value="38"
              />
            </span>
            <span className="input-radio" >
              <label className="">255</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="255"
                data-value="255"
                id="FW_SIZE1"
                name="SIZE"
                value="39"
              />
            </span>
            <span className="input-radio" >
              <label className="">260</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="260"
                data-value="260"
                id="FW_SIZE1"
                name="SIZE"
                value="42"
              />
            </span>
            <span className="input-radio" >
              <label className="">265</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="265"
                data-value="265"
                id="FW_SIZE1"
                name="SIZE"
                value="43"
              />
            </span>
            <span className="input-radio" >
              <label className="">270</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="270"
                data-value="270"
                id="FW_SIZE1"
                name="SIZE"
                value="46"
              />
            </span>
            <span className="input-radio" >
              <label className="">275</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="275"
                data-value="275"
                id="FW_SIZE1"
                name="SIZE"
                value="47"
              />
            </span>
            <span className="input-radio" >
              <label className="">280</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="280"
                data-value="280"
                id="FW_SIZE1"
                name="SIZE"
                value="50"
              />
            </span>
            <span className="input-radio" >
              <label className="">285</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="285"
                data-value="285"
                id="FW_SIZE1"
                name="SIZE"
                value="51"
              />
            </span>
            <span className="input-radio" >
              <label className="">290</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="290"
                data-value="290"
                id="FW_SIZE1"
                name="SIZE"
                value="54"
              />
            </span>
            <span className="input-radio" >
              <label className="sd-out">295</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="295"
                data-value="295"
                id="FW_SIZE1"
                name="SIZE"
                disabled={true}
                value="55"
              />
            </span>
            <span className="input-radio" >
              <label className="">300</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="300"
                data-value="300"
                id="FW_SIZE1"
                name="SIZE"
                value="58"
              />
            </span>
            <span className="input-radio" >
              <label className="sd-out">305</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="305"
                data-value="305"
                id="FW_SIZE1"
                name="SIZE"
                disabled={true}
                value="59"
              />
            </span>
            <span className="input-radio" >
              <label className="sd-out">310</label>
              <input
                type="radio"
                data-attributename="FW_SIZE"
                data-id="0"
                data-friendly-name="310"
                data-value="310"
                id="FW_SIZE1"
                name="SIZE"
                disabled={true}
                value="62"
              />
            </span>
          </div>
        </SizeListWapper>
      </div>
    </>
  );
};

export default SizeList;
