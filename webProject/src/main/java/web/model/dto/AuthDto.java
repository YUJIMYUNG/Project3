package web.model.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto implements UserDetails, OAuth2User {
    // UserDetails : 시큐리티의 일반 회원들의 정보를 조작하는 인터페이스
    // Oauth2User : 시큐리티에서 Oauth2회원들의 정보를 조작하는 인터페이스
    // 위 두 인터페이스를 AuthDto에서 구현 -> AuthDto에서 두 인터페이스를 모두 포함하므로 AuthDto 타입으로 두 타입을 조작할 수 있다.


    // + 필수
    private String loginid; // 로그인한 회원 아이디
    private String loginpwd; // 로그인할 회원의 비번(oauth2 회원은 미사용)
    private List<GrantedAuthority> loginList; // 로그인한 회원의 권한/등급 목록



    // UserDetails, OAuth2User 추상클래스의 메서드 재정의
    @Override
    public String getName() {
        return this.loginid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.loginList;
    }

    @Override
    public String getPassword() {
        return this.loginpwd;
    }

    @Override
    public String getUsername() {
        return this.loginid;
    }

    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }
}
