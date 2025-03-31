package web.model.dto;

import lombok.*;
import web.model.entity.CategoryEntity;
import web.model.entity.UserEntity;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryDto {

    private int cindex;
    private String name;
    private String color;

    private String currentEmail; // 인증(로그인된) 이메일

    public CategoryEntity toEntity() {
        return CategoryEntity.builder()
                .cindex(this.cindex)
                .name(this.name)
                .color(this.color)
                .build();
    }


}
