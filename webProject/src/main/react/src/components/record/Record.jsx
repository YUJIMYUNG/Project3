import React, { useContext, useEffect, useState } from 'react';
import { LoginInfoContext } from '../../App';
import api from '../../api/axios';
import Button from '../atoms/Button';
import FormField from '../../molecules/FormField';

const Record = () => {
    // 로그인 정보 가져오기
    const {loginInfo} = useContext(LoginInfoContext);

    // 1. 상태 관리
    const [categories, setCategories] = useState([]); // 카테고리
    const [title, setTitle] = useState(''); // 
    const [content, setContent] = useState('');
    const [duration, setDuration] = useState('');
    const [registedate, setRegistdate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [record, setRecord] = useState([]);
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

    // 3. 학습 기록 목록 가져오기
    const getRecordList = () => {
        api.get("/record/findAll.do")
            .then(response => {
                console.log('학습기록 응답 : ', response);
                const recordData = response.data || [];
                setRecord(recordData);
            })
            .catch(error => {
                console.log('학습기록 가져오기 오류' , error);
                setRecord([]);
            })
    }

    // 컴포넌트 마운트시 데이터 로드
    useEffect(() => {
         // 카테고리 목록 가져오기
        api.get("/category/findAll.do")
        .then(response => {
            console.log("카테고리 응답:", response);
            const categoryData = response.data === 'Category List is null' ? [] : response.data;
            setCategories(categoryData);
            
            // 기본 카테고리 설정 - 첫 번째 카테고리가 있다면 그것을 선택
            if (categoryData.length > 0) {
                setSelectedCategory(categoryData[0].cindex.toString());
            }
        })
        .catch(error => {
            console.log("카테고리 목록 가져오기 오류", error);
            setCategories([]);
        });
    }, [])

    // 4. 유효성 검사
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            title: '',
            content: '',
            duration: '',
            category: ''
        }

        if (!title.trim()) {
            newErrors.title = '제목을 입력해주세요';
            isValid = false;
        }

        if (!content.trim()) {
            newErrors.content = '내용을 입력해주세요';
            isValid = false;
        }

        if (!duration.trim()) {
            newErrors.duration = '학습 시간을 입력해주세요';
            isValid = false;
        } else if (isNaN(duration) || Number(duration) <= 0) {
            newErrors.duration = '유효한 학습 시간을 입력해주세요';
            isValid = false;
        }

        if (!selectedCategory) {
            newErrors.category = '카테고리를 선택해주세요';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    // 5. 학습기록 등록
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) { // 유효성검사 실패하면 return 
            return ;
        }

        // 카테고리가 선택되지 않았을 경우
        if (!selectedCategory || selectedCategory === '0') {
            setErrors(prev => ({
                ...prev,
                category: '카테고리를 선택해주세요'
            }));
            return;
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
                    // 목록 새로고침
                    getRecordList();
                } else {
                    alert('학습 기록 등록에 실패했습니다.')
                } // If-else end
            })
            .catch(error => {
                console.log('학습 기록 등록 오류' , error);
                alert('학습 기록 등록 중 오류 발생');
            });
    };

    // 날짜 포맷팅 함사ㅜ
    const formatData = (registedate) => {
        if(!registedate) return '';
        const data = new Date(registedate);
        return data.toLocaleString();
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">학습 기록하기</h2>
                    
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
            </div>

            {/* 학습 기록 목록 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">나의 학습 기록</h2>
                    
                    {record.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">등록된 학습 기록이 없습니다.</p>
                            <p className="text-gray-600">첫 학습 기록을 남겨보세요!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학습 시간</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {record.map((record) => (
                                        <tr key={record.rindex} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div 
                                                        className="w-4 h-4 rounded-full mr-2" 
                                                        style={{ backgroundColor: record.categoryColor || '#cccccc' }}
                                                    ></div>
                                                    <span className="text-sm font-medium text-gray-900">{record.categoryName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.duration}분
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatData(record.registedate)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Record;