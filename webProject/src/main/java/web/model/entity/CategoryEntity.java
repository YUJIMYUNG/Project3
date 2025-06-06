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
@Table(name = "record_category")
public class CategoryEntity extends BaseTime{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cindex; // 카테고리 번호

    @Column(columnDefinition = "varchar(100)", nullable = false)
    private String name; // 카테고리 이름

    @Column(columnDefinition = "varchar(100)", nullable = false)
    private String color; // 카테고리 색상

    @ManyToOne
    @JoinColumn(name = "uindex", nullable = true)
    private UserEntity userEntity;

    public CategoryDto toDto() {
        return CategoryDto.builder()
                .cindex(this.cindex)
                .name(this.name)
                .color(this.color)
                .currentEmail(this.userEntity.getEmail())
                .build();
    }


}
