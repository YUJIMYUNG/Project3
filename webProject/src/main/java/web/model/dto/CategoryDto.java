package web.model.dto;

import lombok.*;
import web.model.entity.CategoryEntity;

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

    public CategoryEntity toEntity() {
        return CategoryEntity.builder()
                .cindex(this.cindex)
                .name(this.name)
                .color(this.color)
                .build();
    }


}
