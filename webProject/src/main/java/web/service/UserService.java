package web.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.model.dto.AuthDto;
import web.model.dto.UserDto;
import web.model.entity.UserEntity;
import web.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService implements UserDetailsService, OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    @Autowired
    private UserRepository userRepository;

    // 1. 회원가입
    @Transactional
    public boolean signup(UserDto userDto) {
        // 1. 저장할 dto를 entity로 변환
        UserEntity userEntity = userDto.toEntity();
        // 2. 변환된 entity를 save하고 그 엔티티를 반환 받음
        UserEntity saveEntity = userRepository.save(userEntity);
        // 3. 영속된 엔티티 회원번호가 0보다 크면 회원가입 성공, 아니면 회원가입 실패
        if (saveEntity.getUindex() > 0) {
            return true;
        } else {
            return false;
        }// if-else end
    } // signup f end

    // 2. 시큐리티를 이용한 로그인
    //  - loadUserByUsername 재정의
    @Override
    public UserDetails loadUserByUsername(String loginid) throws UsernameNotFoundException {
        System.out.println("loginid" + loginid);
        System.out.println("UserService.loadUserByUsername");

        // 1. loginid를 이용하여 데이터베이스에 저장된 암호화 패스와드 가져오기
        UserEntity userEntity = userRepository.findByEmail(loginid);
        if (userEntity == null) { // 입력받은 아이디(이메일)의 엔티티가 없으면
            throw new UsernameNotFoundException("존재하지 않는 아이디입니다.");
        } // if end

        // 2. 입력받은 아이디(이메일)의 엔티티가 존재하면 암호화된 패스워드 확인
        String password = userEntity.getPassword();
        System.out.println("password" + password);

        // 3. 권한 부여
        // SimpleCratedAuthority : 시큐리티 사용자의 권한 클래스(구현체)
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_USER")); // 권한명 규칙 : ROLE_권한명(대문자)

        // 4. 권한목록을 넣어줌
        AuthDto authDto = AuthDto.builder()
                .loginid(loginid)
                .loginpwd(password)
                .loginList(authorityList)
                .build();

        return authDto;
    } // loadByUsername o end

    // 시큐리티 oauth2 loadUser 재정의
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("UserService.loadUser");
        System.out.println("userRequest = " + userRequest);

        // 1. 로그인을 성공한 oauth2의 사용자 정보(동의항목) 정보 반환
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        // 2. 로그인한 모든 정보 반환, oauth2 회사명 반환(카카오, 네이버)
        String registeraiontId = userRequest.getClientRegistration().getRegistrationId();
        System.out.println("registeraionId" + registeraiontId);

        String nickname = null;
        Map<String, Object> profile = null;

        // 3. 카카오 유저일 때 정보 반환 (회사마다 유저 정보 반환 방법이 다름)
        if (registeraiontId.equals("kakao")) {
            // 3-1. 로그인 성공한 회원의 정보 가져오기 Map<String, Object> 타입으로 형변환
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
            // 3-2. 세부 회원정보 가져오기
            profile = (Map<String, Object>) kakaoAccount.get("profile");
            nickname = profile.get("nickname").toString();
            // 3-3. 만약 최초 로그인이면 회원 DB에 저장
            if (userRepository.findByEmail(nickname) == null) {
                UserEntity userEntity = UserEntity.builder()
                        .nickname(nickname)
                        .email(nickname) // 실제 카카오 이메일을 가져올 수 없으므로 닉네임으로 대체
                        // 실제 카카오 회원의 비밀번호는 절대 못가져오므로 임의의 비밀번호를 만든다.OAUTH회원은 비밀번호를 사용하지 않음. 번호 처리 어떻게할지 다시 고민해보기
                        .password(new BCryptPasswordEncoder().encode("1234"))
                        .build();
                userRepository.save(userEntity);
            }// if end

            // 3-2. 네이버 유저일 때 정보 반환
        } else if (registeraiontId.equals("naver")) {

        } // if- elsif end

        // 4. 권한 부여
        List<GrantedAuthority> authority = new ArrayList<>();
        authority.add(new SimpleGrantedAuthority("ROLE_USER"));
        authority.add(new SimpleGrantedAuthority("ROLE_OAUTH"));

        AuthDto authDto = AuthDto.builder()
                .loginid(nickname)
                .loginList(authority)
                .build();
        return authDto;
    } // loeadUser o end


    // 4. 이메일 중복 검사
    public boolean checkedEmail(String email) {
        return !userRepository.existsByEmail(email);
    }

    // 5. 닉네임 중복 검사
    public boolean checkedNickname(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    // 6. 현재 인증된 사용자 정보를 가져오기
    public UserEntity getCurrentUser() {
        // 1. SecurityContextHolder에서 현재 인증 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증정보가 없거나 인증되어있지 않거나 익멍 사용자인 경우
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return null;
        }

        // 2. 사용자 식별 정보 가져오기
        String userEmail = null;

        // 2-1.AuthDto 타입인 경우
        if (authentication.getPrincipal() instanceof AuthDto) {
            AuthDto authDto = (AuthDto) authentication.getPrincipal();
            userEmail = authDto.getLoginid();
            // 2-2. Oauth2User 타입인 경우
        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            // 카카오 로그인인 경우
            Map<String, Object> attributes = oAuth2User.getAttributes();
            if(attributes.containsKey("kakao_account")) {
                Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                userEmail = profile.get("nickname").toString();
            } // 네이버 처리 추가해야함
            // 2-3. 일반 UserDetails 타입인 경우(소셜로그인X)
        } else if(authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userEmail = userDetails.getUsername();

            // 2-4. 그 외 문자열 타입인 경우
        } else {
            userEmail = authentication.getName();
        } // if- else end

        // 3. 이메일로 사용자 엔티티 조회 및 반환
        if(userEmail != null) {
            return userRepository.findByEmail(userEmail);
        }
        return null;
    }// getCurrentUser end

    // 7. 현재 로그인한 사용자의 정보를 DTO로 반환
    public UserDto getMyInfo() {
        UserEntity userEntity = getCurrentUser();
        if(userEntity == null) {
            return null;
        }

        // 엔티티를 DTO로 변환
        return UserDto.builder()
                .uindex(userEntity.getUindex())
                .email(userEntity.getEmail())
                .nickname(userEntity.getNickname())
                .build();
    }
}