import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import FormField from '../../../molecules/FormField';
import Button from '../../atoms/Button';
import { validateStudyRecord } from '../../../utils/validationUtils';

const RecordRegist = () => {
    // 1. 상태 관리
        const [categories, setCategories] = useState([]); // 카테고리
        const [title, setTitle] = useState(''); // 학슴기록제목
        const [content, setContent] = useState(''); // 학습기록내용
        const [duration, setDuration] = useState(''); // 학습기록시간
        const [selectedCategory, setSelectedCategory] = useState(''); // 학습기록할 카테고리선택여부
        
        const [errors, setErrors] = useState({
                title : '',
                content : '',
                duration : '',
                categories : ''
            })

    // 2. 카테고리 목록 가져오기
    const getCategoryList = () => {
        api.get("/category/findAll.do")
            .then(response => {
                console.log('카테고리 응답', response);

                 // 응답 데이터가 문자열 'Category List is null'인 경우 빈 배열로 처리
                 const categoryData = response.data === 'Category List is null' ? [] : response.data;
                 setCategories(categoryData);
                 
                 // 기본값 설정
                 if (categoryData.length > 0) {
                     setSelectedCategory(categoryData[0].cindex.toString());
                 }
             })
             .catch(error => {
                 console.log("카테고리 목록 가져오기 오류", error);
                 setCategories([]);
             });
    }

    // 컴포넌트 마운트시 데이터 로드
        useEffect(() => {
            getCategoryList();
        }, [])


    // 5. 학습기록 등록
    const handleSubmit = (e) => {
        e.preventDefault();

        const validateForm = {
            setTitle,
            setContent,
            setDuration,
            setSelectedCategory
        };

        const {isValid, errors} = validateStudyRecord(validateForm);

        if(isValid) {
            submitStudyRecord();
        } else {
            setErrors(errors);
        }

        if(!validateForm()) { // 유효성검사 실패하면 return 
            return ;
        }

        const recordData = {
            title: title,
            content: content,
            duration: Number(duration),
            cindex: Number(selectedCategory) // cindex는 백엔드에서 카테고리 인덱스를 받는 필드
        };

        console.log("학습기록 입력 데이터",recordData)

        api.post('/record/register.do', recordData)
            .then(response => {
                console.log('학습 기록 등록 응답 :' , response);
                if(response.data){
                    alert('학습 기록이 등록되었습니다.');

                    // 폼 초기화
                    setTitle('');
                    setContent('');
                    setDuration('');
                    if(categories.length > 0) {
                        setSelectedCategory(categories[0].cindex.toString());
                    } else {
                        setSelectedCategory('');
                    }
                } else {
                    alert('학습 기록 등록에 실패했습니다.')
                } // If-else end
            })
            .catch(error => {
                console.log('학습 기록 등록 오류' , error);
                alert('학습 기록 등록 중 오류 발생');
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">학습 기록 등록하기</h2>

            {categories.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
                            <p className="text-gray-600 mb-2">등록된 카테고리가 없습니다.</p>
                            <p className="text-gray-600">먼저 카테고리를 등록해주세요.</p>
                            <Button
                                type="button"
                                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => window.location.href = '/category/register'}
                            >
                                카테고리 등록하러 가기
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 카테고리 선택 */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">학습 카테고리</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                >
                                    <option value="">카테고리 선택</option>
                                    {categories.map((category) => (
                                        <option key={category.cindex} value={category.cindex.toString()}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>
                            

                            {/* 제목 입력 */}
                            <FormField
                                label="제목"
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="학습 제목을 입력하세요"
                                errorMessage={errors.title}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />

                            {/* 내용 입력 */}
                            <div className="space-y-2">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="학습 내용을 입력하세요"
                                    rows={5}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>

                            {/* 학습 시간 입력 */}
                            <FormField
                                label="학습 시간 (분)"
                                type="number"
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="학습한 시간을 분 단위로 입력하세요"
                                errorMessage={errors.duration}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />

                            <Button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                학습 기록 등록하기
                            </Button>
                        </form>
                    )}
        </div>
    );
};

export default RecordRegist;