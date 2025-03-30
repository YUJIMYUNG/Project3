package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.model.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    // 1. 아이디로 엔티티 조회
    UserEntity findByEmail(String email);

    // 2. 이메일 중복 확인
    boolean existsByEmail(String email);

    // 3. 닉네임 중복 확인
    boolean existsByNickname(String nickname);
}
