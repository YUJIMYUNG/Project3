package web.model.entity;

import jakarta.persistence.*;
import lombok.*;
import web.model.dto.RecordDto;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "record")
public class RecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rindex; // 인덱스

    @Column(columnDefinition = "varchar(100)", nullable = false)
    private String title; // 공부기록 제목


    @Column(columnDefinition = "longtext", nullable = false)
    private String content; // 공부기록 내용

    @Column(columnDefinition = "int", nullable = false)
    private String duration; // 공부시간(분단위)

    // 작성자번호(FK)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "mno")
    private UserEntity userEntity;

    public RecordDto toDto() {
        return RecordDto.builder()
                .rindex(this.rindex)
                .title(this.title)
                .duration(this.duration)
                .build();
    }


}



