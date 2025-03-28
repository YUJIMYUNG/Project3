package web.model.entity;

import jakarta.persistence.*;
import lombok.*;
import web.model.dto.UserDto;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "record_user")
public class UserEntity extends BaseTime{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uindex; // 회원번호

    @Column(columnDefinition = "varchar(20)", nullable = false, unique = true)
    private String nickname; // 회원닉네임


    @Column(columnDefinition = "varchar(100)", nullable = false, unique = true)
    private String email; //회원이메일

    @Column(columnDefinition = "varchar(255)", nullable = false, unique = true)
    private String password; //회원비밀번호


    public UserDto toDto() {
        return UserDto.builder()
                .uindex(this.uindex)
                .nickname(this.nickname)
                .password(this.password)
                .email(this.email)
                .signupdate(this.getCreatedate().toString())
                .modificationdate(this.getUpdatedate().toString())
                .build();
    }




}
