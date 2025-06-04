import React, { useContext, useEffect, useState } from 'react';
import api from '../../../api/axios';

const RecordList = () => {
    // 1. 상태관리
    const [record, setRecord] = useState([]);
    const [errors, setErrors] = useState({
            title : '',
            content : '',
            duration : '',
            categories : ''
        })

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
        getRecordList();
    }, [])


    // 날짜 포맷팅 함사ㅜ
    const formatData = (registedate) => {
        if(!registedate) return '';
        const data = new Date(registedate);
        return data.toLocaleString();
    }


    return (
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리명</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학습 시간</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {record.map((record) => (
                                    <tr key={record.rindex} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {record.cname}
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
    );
};

export default RecordList;