CustomDialog 사용법
=================

### Example
```javascript
import useCustomDialog from '~/hooks/useCustomDialog';

const { alert } = useCustomDialog();

const callback = async() => { 
    const result = await alert("title", "desc");
}
```

### Import & Prepare Use
```javascript
import useCustomDialog from '{프로젝트 경로}/src/hooks/useCustomDialog'; // 상대 경로 사용

const { alert, confirm, setFolderName /*.. etc */} = useCustomDialog() // 필요한 것만 불러와서 사용
```

### Kinds
```javascript
const result = await alert("title", "desc") // 확인 버튼만 표시
const result = await confirm("title", "message") // 취소, 확인 버튼 | 반환 값: 확인 여부(Boolean)
```

### Set

- Dialog를 표시하기 전 호출해야 함
```javascript
setFolderName("FolderName"); // 폴더 이름 지정 (미지정 시 프레임 표시되지 않음)
setButtonText(["아니오", "네"]); // 버튼 텍스트 지정 (왼쪽부터)
```