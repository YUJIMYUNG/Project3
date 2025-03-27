package web.model.dto;

import lombok.*;
import web.model.entity.RecordEntity;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RecordDto {

    private int rindex; // 인덱스
    private String title; // 공부기록 제목
    private String content; // 공부기록 내용
    private String duration; // 공부시간(분단위)
    private String registedate; // 공부기록 등록한 시간


    public RecordEntity toEntity() {
        return RecordEntity.builder()
                .rindex(this.rindex)
                .title(this.title)
                .duration(this.duration)
                .build();
    }

}
