import React, { useContext, useState } from 'react';
import RecordChart from './RecordChart';
import RecordList from './RecordList';
import RecordRegist from './RecordRegist';
import { LoginInfoContext } from '../../../App';



const RecordPage = () => {
    // 로그인 정보 가져오기
    const {loginInfo} = useContext(LoginInfoContext);



    return (
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            {/* 학습 기록 등록 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">학습 기록</h2>
                    
                    <RecordRegist />
                </div>
            </div>

            {/* 학습 기록 목록 */}
            <div>
                <RecordList />
            </div>

            {/* 차트로 학습목록 시각화 */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">카테고리별 학습기록 CHART</h2>
                <div>
                    <RecordChart />
                </div>
            </div>


        </div>
    </div>
    );
};

export default RecordPage;