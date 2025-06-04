// 학습카테고리 입력폼 유효성 검사
export const validateStudyRecord = (formData) => {
    // 입력한 내용 데이터로 받아서 저장
    const {title, content, duration, selectedCategory} = formData;

    // 에러내용 
    const errors = {
        title : '',
        content : '',
        duration : '',
        category: ''
    }

    let isValid = true;

    if(!title?.trim()) {
        errors.title = '제목을 입력해주세요.';
        isValid = false;
    }

    if(!content?.trim()) {
        errors.content = '내용을 입력해주세요.'
        isValid = false;
    }

    if(!duration?.trim()) {
        errors.duration = '학습 시간을 입력해주세요.';
        isValid = false;
    } else if(isNaN(duration) || Number(duration) <= 0 ){
        errors.duration = '유효한 학습 시간을 입력해주세요.'
        isValid = false;
    }

    if(!selectedCategory) {
        errors.category = '카테고리를 선택해주세요.';
        isValid = false;
    }

    return {
        isValid,
        errors
    };
};

// 카테고리 입력폼 유효성 검사
export const validateCategoryForm = (formData) => {
    const {name, color} = formData;

    const errors = {
        name: '',
        color: '',
    }

    let isValid = true;

    if(!name?.trim()) {
        errors.name = '카테고리명을 입력해주세요.';
        isValid = false;
    }

    if(!color?.trim()) {
        errors.color = '카테고리 색상을 선택해주세요.'
        isValid = false;
    }

    return {
        isValid,
        errors
    }
}