import React from 'react';

interface IOptionListProps {
  optionImgUrls: IOptionListPropsOpt[];
}

interface IOptionListPropsOpt {
  optionColorImgUrl: string;
}

const OptionList: React.FC<IOptionListProps> = React.memo(({ optionImgUrls }) => {
  return (
    <>
      {optionImgUrls.map((opt, index) => {
        return (
          <div key={index}>
            <a href={opt.optionColorImgUrl}>opt color img</a>
          </div>
        );
      })}
    </>
  );
});

export default OptionList;
