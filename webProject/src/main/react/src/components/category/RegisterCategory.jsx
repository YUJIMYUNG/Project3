import axios from 'axios';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const RegisterCategory = () => {
    // 1. useState
    const [name, setName] = useState(''); // 카테고리명
    const [color, setColor] = useState(''); // 카테고리 색상
    const [showPicker, setShowPicker] = useState(false); // 색상 선택기 표시 여부

    // 2. 전송 함수
    const onRegisterCategory = (e) => {
        e.preventDafault(); // 폼 기보 ㄴㄴ동작 방지

        console.log(name);
        console.log(color);

        if(!name.trim()) {
            alert('카테고리명을 입력해주세요');
            return;
        }

        let data = {
            name : name,
            color : color
        }

        axios.post("/category/register.do", data)
            .then(response => { console.log(response)
                if(response.data) {
                    alert('카테고리 등록 성공');
                    // 등록성공하면 폼 초기화
                    setName('');
                    setColor('');
                } else {
                    alert('카테고리 등록 실패')
                } // if-else end
            })
            .catch(error => {console.log(error)})
    }

    // 3. 색상표 토글 함수
    const toggleColorPicker = () => {
        setShowPicker(!showPicker);
    }

    return (
        <div>
           <form onSubmit={onRegisterCategory}>
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
                
                <button type="submit" className="register-btn">등록하기</button>
            </form>
            
            
        </div>
    );
};

export default RegisterCategory;