package web.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotNull
    @Size(max = 100, message = "제목은 100자 이내로 작성해주세요.")
    private String title; // 공부기록 제목
    @NotNull
    private String content; // 공부기록 내용
    @NotNull
    private int duration; // 공부시간(분단위)

    private String registedate; // 공부기록 등록한 시간

    private int cindex; // 학습기록의 카테고리번호


    public RecordEntity toEntity() {
        return RecordEntity.builder()
                .rindex(this.rindex)
                .title(this.title)
                .duration(this.duration)
                .content(this.content)
                .build();
    }

}
