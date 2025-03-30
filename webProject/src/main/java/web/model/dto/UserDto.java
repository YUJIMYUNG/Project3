package web.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import web.model.entity.UserEntity;

@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {
    private int uindex;
    @NotNull
    @Size(min = 2, max = 10, message = "닉네임은 2~10 글자로 작성해주세요.")
    private String nickname;
    @Email(message = "이메일 형식이 잘못되었습니다.")
    @NotNull
    private String email;
    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "비밀번호는 8~20 문자와 숫자, 특수문자를 이용하여 작성해주세요. ")
    private String password;

    private String signupdate;
    private String modificationdate;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .uindex(this.uindex)
                .nickname(this.nickname)
                .email(this.email)
                .password(new BCryptPasswordEncoder().encode(this.password))
                .build();
    }
}
