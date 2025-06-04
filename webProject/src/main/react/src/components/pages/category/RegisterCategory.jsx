import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import api from '../../../api/axios';
import FormField from '../../../molecules/FormField';
import Button from '../../atoms/Button';

const RegisterCategory = () => {
    // 1. useState
    const [name, setName] = useState(''); // 카테고리명
    const [color, setColor] = useState('#1abc9c'); // 카테고리 색상
    const [showPicker, setShowPicker] = useState(false); // 색상 선택기 표시 여부
    const [categorries, setCategories] = useState([]); //카테고리 목록

    const [nameError, setNameError] = useState(''); // 카테고리명 에러메세지
    
    // 2. 카테고리 등록 전송 함수
    const onRegisterCategory = (e) => {
        // form 기본 동작 방지
        e.preventDefault();

        if(!name.trim()) {
            alert('카테고리명을 입력해주세요');
            return;
        }

        let data = {
            name : name,
            color : color
        }

        api.post("/category/register.do", data)
            .then(response => { console.log(response)
                if(response.data) {
                    alert('카테고리 등록 성공');
                    // 등록성공하면 폼 초기화하고 
                    setName('');
                    setColor('');
                    setNameError('');
                    // 카테고리 목록 새로고침
                    getCategoryList();
                } else {
                    alert('카테고리 등록 실패')
                } // if-else end
            })
            .catch(error => {console.log("카테고리 등록 오류", error)})
    }

    // 3. 색상표 토글 함수
    const toggleColorPicker = () => {
        setShowPicker(!showPicker);
    }

    // 4. 카테고리 목록 전송 함수
    const getCategoryList = (e) => {
        
        api.get("/category/findAll.do")
        .then(response => {
            console.log(response)
            // 응답 데이터가 문자열 'Category List is null'인 경우 빈 배열로 처리
            const categoryData = response.data === 'Category List is null' ? [] : response.data;
            
            console.log("category list data", categoryData);
            setCategories(categoryData);  
            })
        .catch(error => {
            console.log("카테고리 목록 가져오기 오류" , error)
            setCategories([]);
        });
    }

    // 컴포넌트 마운트시 및 카테고리 등록 후 목록 가져오기
    useEffect(() => {
        getCategoryList();
    }, []);



    return (
        <div className="container flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">카테고리 등록</h2>
                </div>
                {/* 카테고리 등록 */}
                <form onSubmit={onRegisterCategory}>
                    <FormField
                        label="학습 카테고리명"
                        type="text"
                        id="categoryName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="카테고리명을 입력하세요"
                        errorMessage={nameError}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    {/* 색상 토글 */}
                    <div className="form-group">
                        <label>학습 카테고리 색상:</label>
                        <div className="color-selector">
                            <div 
                                className="color-preview" 
                                style={{ 
                                    backgroundColor: color,
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    border: '1px solid #ddd'
                                }}
                                onClick={toggleColorPicker}
                            ></div>
                            <input 
                                type="text" 
                                value={color} 
                                onChange={(e) => setColor(e.target.value)}
                                readOnly
                            />
                        </div>
                        
                        {showPicker && (
                            <div className="color-picker-container">
                                <HexColorPicker
                                    color={color} 
                                    onChange={setColor} 
                                />
                                <div className="color-presets">
                                    {['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'].map((presetColor) => (
                                        <div 
                                            key={presetColor}
                                            className="color-preset"
                                            style={{
                                                backgroundColor: presetColor,
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                margin: '4px'
                                            }}
                                            onClick={() => {
                                                setColor(presetColor);
                                            }}
                                        ></div>
                                    ))}
                                </div>
                                <button 
                                    type="button" 
                                    className="close-picker"
                                    onClick={() => setShowPicker(false)}
                                >
                                    닫기
                                </button>
                            </div>
                        )}
                    </div>
                        
                    <Button 
                        type="submit" 
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        카테고리 등록하기
                    </Button>
                    </form>

                    {/* 카테고리 목록 */}
                    <div id="categoryListForm">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">카테고리 목록</h2>
                        </div>
                        {categorries.length === 0 ? (
                            <div className="no-categories">
                                <p> 등록된 카테고리가 없습니다.</p>
                                <p> 학습 기록할 카테고리를 등록해주세요. </p>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <th>NO</th>
                                    <th>학습 카테고리명</th>
                                    <th>학습 카테고리 색상</th>
                                </thead>
                                <tbody>
                                    {categorries.map((category, index) => (
                                        <tr key={category.cindex || index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div 
                                               className="w-8 h-8 rounded-md shadow-sm border border-gray-300" 
                                               style={{ 
                                                   backgroundColor: category.color || '#cccccc',
                                                   display: 'block',
                                                   width: '2rem',
                                                   height: '2rem'
                                               }}
                                               title={category.color}
                                            ></div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default RegisterCategory;