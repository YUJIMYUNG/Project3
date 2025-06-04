package web.model.dto;

import lombok.*;
import web.model.entity.RecordEntity;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RecordResponseDto {
    private int rindex;
    private String title;
    private String content;
    private int duration;
    private String registedate;
    private String cname; // 카테고리명
    private String ccolor; // 카테고리 색상

    // 엔티티에서 DTO로 변환하는 생성자
    public RecordResponseDto forEntity(RecordEntity entity) {
        return RecordResponseDto.builder()
                .rindex(entity.getRindex())
                .title(entity.getTitle())
                .content(entity.getContent())
                .duration(entity.getDuration())
                .registedate(entity.getCreatedate().toString())
                .cname(entity.getCategoryEntity().getName())
                .ccolor(entity.getCategoryEntity().getColor())
                .build();
    }
}
