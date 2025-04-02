import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import api from '../api/axios';

const RegisterCategory = () => {
    // 1. useState
    const [name, setName] = useState(''); // 카테고리명
    const [color, setColor] = useState(''); // 카테고리 색상
    const [showPicker, setShowPicker] = useState(false); // 색상 선택기 표시 여부
    const [categorries, setCategories] = useState([]); //카테고리 목록


    console.log(name);
    console.log(color);

    
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
        .then(response => {console.log(response)
            if(response.data) {
                console.log("category list data", response.data)
                setCategories(response.data);  
                }
            })
        .catch(error => {
            console.log("카테고리 목록 가져오기 오류" , error)
        });
    }

    // 컴포넌트 마운트시 및 카테고리 등록 후 목록 가져오기
    useEffect(() => {
        getCategoryList();
    }, []);



    return (
        <div>
            {/* 카테고리 등록 */}
           <form >
                <div className="form-group">
                    <label htmlFor="categoryName">학습 카테고리명:</label>
                    <input 
                        type="text" 
                        id="categoryName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="카테고리명을 입력하세요"
                        required
                    />
                </div>
                
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
                
                <button type="submit" className="register-btn" onClick={onRegisterCategory}>등록하기</button>
            </form>

            {/* 카테고리 목록 */}
            <div id="categoryListForm">
                <h3>카테고리 목록</h3>
                {categorries.length === 0 ? (<p> 등록된 카테고리가 없습니다.</p>) : (
                    <table>
                        <thead>
                            <tr>NO</tr>
                            <tr>학습 카테고리명</tr>
                            <tr>학습 카테고리 색상</tr>
                        </thead>
                        <tbody>
                            {categorries.map((category, index) => (
                                <tr key={category.cindex || index}>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td>{category.color}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>


            
            
        </div>
    );
};

export default RegisterCategory;