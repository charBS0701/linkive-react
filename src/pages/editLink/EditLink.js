import styled from "styled-components";
import palette from "../../styles/colorPalette";

// PageSheet
const PageSheet = styled.div`
  display: float;
`;

// Page Sheet 선택 문구
const PageSheetLabel = styled.div`
  color: ${palette.mainColor};
  font-size: 1.1em;
  font-family: 'NanumSquare_acR';
`;

// Page Sheet 선택 리스트
const SelectPageSheet = styled.select`
  margin-left: 1vw;
`;

const EditLink = () => {
  const pageSheetDefault = ['자유', '여행', '공부', '개발', '일기', '체크 리스트'];
  const pageSheetCustom = ['맛집', '운동'];

  return (
    <PageSheet>
      <PageSheetLabel>
        Page Sheet
      </PageSheetLabel>
      <SelectPageSheet>
        {
          pageSheetDefault.map(pageSheet => (
            <option value={pageSheet}>{pageSheet}</option>
          ))
        }
        {
          pageSheetCustom.map(pageSheet => (
            <option value={pageSheet}>{pageSheet}</option>
          ))
        }
      </SelectPageSheet>
    </PageSheet>
  );
}

export default EditLink;