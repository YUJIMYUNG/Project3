package web.model.entity;

import jakarta.persistence.*;
import lombok.*;
import web.model.dto.CategoryDto;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "category")
public class CategoryEntity extends BaseTime{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cindex; // 카테고리 번호

    @Column(columnDefinition = "varchar(100)", nullable = false, unique = true)
    private String name; // 카테고리 이름

    @Column(columnDefinition = "varchar(100)", nullable = false, unique = true)
    private String color; // 카테고리 색상

    public CategoryDto toDto() {
        return CategoryDto.builder()
                .cindex(this.cindex)
                .name(this.name)
                .color(this.color)
                .build();
    }


}
